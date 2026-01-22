import React from "react";
import { Routes, Route } from "react-router-dom";
import Drawx from "./Drawx";
import ExpertForm from "./Expert Form"
import Expertprofile from "./ExpertDashboard"
import Test from "./Dashboard";

import Dashboard from "./pages/dashboard";
import Mentees from "./pages/mentees";
import Availability from "./pages/availability";
import Resources from "./pages/resources";
import Profile from "./pages/profile";
import Revenue from "./pages/revenue";


function App() {
  return (
    <>
    <Routes>
    <Route path="expertform" element={<ExpertForm />} />
    <Route path="expertprofile" element={<Expertprofile />} />
    <Route path="dash" element={ <Test/>}/>
    
      <Route path="/" element={<Drawx />}>
        <Route index element={<Dashboard />} />
        <Route path="mentees" element={<Mentees />} />
        <Route path="availability" element={<Availability />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
        <Route path="revenue" element={<Revenue />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
