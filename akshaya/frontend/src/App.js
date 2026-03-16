import React from "react";
import { Routes, Route } from "react-router-dom";
import ExpertSideBar from "./Expert_side&topbar";
import ExpertForm from "./firstForm";
import Expertprofile from "./firstDashboard";
import ExpertHomepage from "./Expert_homepage";
import Ads from "./expert_ads";

import ExpertDashboard from "./pages/expert_dashboard";
import ExpertMentees from "./pages/expert_mentees";
import ExpertAvailability from "./pages/expert_availability";
import ExpertResources from "./pages/expert_resources";
import ExpertProfile from "./pages/expert_profile";
import ExpertRevenue from "./pages/expert_revenue";
function App() {
  return (
    <>
    <Routes>    
    <Route path="expertform" element={<ExpertForm />} />
    <Route path="expertprofile" element={<Expertprofile />} />
    <Route path="dashboard" element={ <ExpertHomepage/>}/>
    <Route path="ads" element={ <Ads/>}/>
      <Route path="/" element={<ExpertSideBar />}>
        <Route index element={<ExpertDashboard />} />
        <Route path="mentees" element={<ExpertMentees />} />
        <Route path="availability" element={<ExpertAvailability />} />
        <Route path="resources" element={<ExpertResources />} />
        <Route path="profile" element={<ExpertProfile />} />
        <Route path="revenue" element={<ExpertRevenue />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
