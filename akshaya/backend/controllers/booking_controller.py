from database import bookings_collection, availability_dashboard
from models import Booking
import json
from bson import ObjectId
from datetime import datetime

# ===================== CREATE BOOKING =====================
def create_booking_controller(booking_data: dict):
    try:
        required_keys = ["expertId", "expertEmail", "expertName", "menteeName", "menteeEmail", "date", "time", "duration", "sessionType", "topic"]
        for key in required_keys:
            if not booking_data.get(key):
                return {"success": False, "message": f"{key} is required"}

        expert_id = booking_data.get("expertId")
        date = booking_data.get("date")
        time = booking_data.get("time")
        session_type = booking_data.get("sessionType", "individual").lower()

        if session_type not in ["individual", "group"]:
            return {"success": False, "message": "Invalid sessionType. Use individual or group."}

        existing = list(bookings_collection.find({
            "expertId": expert_id,
            "date": date,
            "time": time
        }))

        # reject if any existing individual booking
        for b in existing:
            if b.get("sessionType") == "individual":
                return {"success": False, "message": "Slot already booked for individual session"}

        # if new booking is individual and any booking exists at same slot
        if session_type == "individual" and existing:
            return {"success": False, "message": "Slot already booked for individual session"}

        booking = {
            "expertId": expert_id,
            "expertEmail": booking_data.get("expertEmail"),
            "expertName": booking_data.get("expertName"),
            "menteeName": booking_data.get("menteeName"),
            "menteeEmail": booking_data.get("menteeEmail"),
            "menteephone": booking_data.get("menteephone"),
            "date": date,
            "time": time,
            "duration": booking_data.get("duration"),
            "sessionType": session_type,
            "topic": booking_data.get("topic"),
            "description": booking_data.get("description", ""),
            "status": "pending",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat(),
        }

        result = bookings_collection.insert_one(booking)
        booking["_id"] = str(result.inserted_id)

        if session_type == "group" and existing:
            return {
                "success": True,
                "message": "Joined existing group session",
                "booking_id": str(result.inserted_id),
                "data": booking
            }

        return {
            "success": True,
            "message": "Booking created successfully",
            "booking_id": str(result.inserted_id),
            "data": booking
        }

    except Exception as e:
        print(f"Error creating booking: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== GET EXPERT BOOKINGS =====================
def get_expert_bookings_controller(expert_email: str, status: str = None):
    
    try:
        query = {"expertEmail": expert_email, "status": {"$ne": "completed"}}
        
        if status:
            query["status"] = status
        
        bookings = list(bookings_collection.find(query).sort("createdAt", -1))
        
        # Convert ObjectId to string
        for booking in bookings:
            booking["_id"] = str(booking["_id"])
        
        return {
            "success": True,
            "count": len(bookings),
            "data": bookings
        }
        
    except Exception as e:
        print(f"Error fetching bookings: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== UPDATE BOOKING STATUS =====================
def update_booking_status_controller(booking_id: str, status: str):
    try:
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": status,
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": f"Booking status updated to {status}",
            "data": result
        }
        
    except Exception as e:
        print(f"Error updating booking: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== GET MENTEE BOOKINGS =====================
def get_mentee_bookings_controller(mentee_email: str):
   
    try:
        bookings = list(bookings_collection.find({"menteeEmail": mentee_email}).sort("date", -1))
        
        # Convert ObjectId to string
        for booking in bookings:
            booking["_id"] = str(booking["_id"])
        
        return {
            "success": True,
            "count": len(bookings),
            "data": bookings
        }
        
    except Exception as e:
        print(f"Error fetching mentee bookings: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== GET BOOKING COUNT BY STATUS =====================
def get_booking_count_by_status_controller(expert_email: str):
    try:
        pipeline = [
            {"$match": {"expertEmail": expert_email}},
            {"$group": {
                "_id": "$status",
                "count": {"$sum": 1}
            }}
        ]
        
        results = list(bookings_collection.aggregate(pipeline))
        count_map = {
            "pending": 0,
            "confirmed": 0,
            "completed": 0,
            "cancelled": 0
        }
        
        for result in results:
            count_map[result["_id"]] = result["count"]
        
        return {
            "success": True,
            "data": count_map
        }
        
    except Exception as e:
        print(f"Error getting booking counts: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== DELETE BOOKING (MARK AS COMPLETED) =====================
def delete_booking_controller(booking_id: str):
    try:
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "completed",
                    "completedAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Booking marked as completed and hidden from dashboard",
            "data": result
        }
        
    except Exception as e:
        print(f"Error completing booking: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== RESCHEDULE BOOKING =====================
def reschedule_booking_controller(booking_id: str, reschedule_data: dict):
    try:
        new_date = reschedule_data.get("date")
        new_time = reschedule_data.get("time")
        
        if not new_date or not new_time:
            return {
                "success": False,
                "message": "Date and time are required for rescheduling"
            }
        
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "date": new_date,
                    "time": new_time,
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Booking rescheduled successfully",
            "data": result
        }
        
    except Exception as e:
        print(f"Error rescheduling booking: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== SEND MEETING LINK =====================
def send_meeting_link_controller(booking_id: str, meeting_link: str):
   
    try:
        if not meeting_link:
            return {
                "success": False,
                "message": "Meeting link is required"
            }
        
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "meetingLink": meeting_link,
                    "linkSentAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Meeting link sent successfully to mentee",
            "data": result
        }
        
    except Exception as e:
        print(f"Error sending meeting link: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== REQUEST RESCHEDULE (EXPERT) =====================
def request_reschedule_controller(booking_id: str, new_date: str, new_time: str):
  
    try:
        if not new_date or not new_time:
            return {
                "success": False,
                "message": "Date and time are required"
            }
        
        # Get current booking to extract old date/time
        booking = bookings_collection.find_one({"_id": ObjectId(booking_id)})
        if not booking:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        old_date = booking.get("date")
        old_time = booking.get("time")
        
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "reschedule_pending",
                    "rescheduleRequest": {
                        "oldDate": old_date,
                        "oldTime": old_time,
                        "newDate": new_date,
                        "newTime": new_time,
                        "requestedAt": datetime.now().isoformat(),
                        "acceptedByMentee": False
                    },
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Reschedule request sent to mentee",
            "data": result
        }
        
    except Exception as e:
        print(f"Error requesting reschedule: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== ACCEPT RESCHEDULE (MENTEE) =====================
def accept_reschedule_controller(booking_id: str):
    
    try:
        # Get the current booking to extract reschedule request details
        booking = bookings_collection.find_one({"_id": ObjectId(booking_id)})
        
        if not booking:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        reschedule_request = booking.get("rescheduleRequest", {})
        new_date = reschedule_request.get("newDate")
        new_time = reschedule_request.get("newTime")
        
        if not new_date or not new_time:
            return {
                "success": False,
                "message": "Invalid reschedule request"
            }
        
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "accepted",
                    "date": new_date,
                    "time": new_time,
                    "rescheduleRequest.acceptedByMentee": True,
                    "rescheduleRequest.acceptedAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Reschedule accepted successfully",
            "data": result
        }
        
    except Exception as e:
        print(f"Error accepting reschedule: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== REJECT RESCHEDULE (MENTEE) =====================
def reject_reschedule_controller(booking_id: str):
   
    try:
        booking = bookings_collection.find_one({"_id": ObjectId(booking_id)})
        
        if not booking:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "rejected",
                    "rescheduleRequest.acceptedByMentee": False,
                    "rescheduleRequest.rejectedAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )
        
        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }
        
        result["_id"] = str(result["_id"])
        
        return {
            "success": True,
            "message": "Reschedule rejected - keeping original booking",
            "data": result
        }
        
    except Exception as e:
        print(f"Error rejecting reschedule: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

# ===================== REQUEST COMPLETE (EXPERT) =====================
def request_complete_controller(booking_id: str):

    try:
        booking = bookings_collection.find_one({"_id": ObjectId(booking_id)})

        if not booking:
            return {
                "success": False,
                "message": "Booking not found"
            }

        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "completion_pending",
                    "completionRequest": {
                        "requestedAt": datetime.now().isoformat(),
                        "acceptedByMentee": False
                    },
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )

        result["_id"] = str(result["_id"])

        return {
            "success": True,
            "message": "Completion request sent to mentee",
            "data": result
        }

    except Exception as e:
        print(f"Error requesting completion: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }
 # ===================== ACCEPT COMPLETE (MENTEE) =====================
def accept_complete_controller(booking_id: str):

    try:

        booking = bookings_collection.find_one({"_id": ObjectId(booking_id)})

        if not booking:
            return {
                "success": False,
                "message": "Booking not found"
            }

        # Update booking status
        bookings_collection.update_one(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "completed",
                    "completionRequest.acceptedByMentee": True,
                    "completionRequest.acceptedAt": datetime.now().isoformat(),
                    "completedAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            }
        )

        expert_email = booking.get("expertEmail")

        # Create completed session object
        completed_session = {
            "topic": booking.get("topic"),
            "clientName": booking.get("menteeName"),
            "date": booking.get("date"),
            "time": booking.get("time"),
            "mode": "Online",
            "duration": booking.get("duration"),
            "status": "Completed"
        }

        # 🔥 Push into availability dashboard
        availability_dashboard.update_one(
            {"email": expert_email},
            {
                "$push": {
                    "sessionsCompleted": completed_session
                }
            },
            upsert=True
        )

        return {
            "success": True,
            "message": "Session marked as completed and added to availability dashboard"
        }

    except Exception as e:
        print(f"Error accepting completion: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }
   
# ===================== REJECT COMPLETE (MENTEE) =====================
def reject_complete_controller(booking_id: str):

    try:

        result = bookings_collection.find_one_and_update(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "status": "confirmed",
                    "completionRequest.acceptedByMentee": False,
                    "completionRequest.rejectedAt": datetime.now().isoformat(),
                    "updatedAt": datetime.now().isoformat()
                }
            },
            return_document=True
        )

        if not result:
            return {
                "success": False,
                "message": "Booking not found"
            }

        result["_id"] = str(result["_id"])

        return {
            "success": True,
            "message": "Completion request rejected",
            "data": result
        }

    except Exception as e:
        print(f"Error rejecting completion: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }