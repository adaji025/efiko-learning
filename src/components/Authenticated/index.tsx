import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/authenticated/Dashboard/Dashboard";
import ExploreSession from "../../pages/authenticated/Sesssion/ExploreSession";
import SessionDetails from "../../pages/authenticated/Sesssion/SessionDetails";
import UpcomingSession from "../../pages/authenticated/Sesssion/UpcomingSession";
import RedcordedSession from "../../pages/authenticated/Sesssion/RecordedSession";
import Notification from "../../pages/authenticated/Notification/Notification";
import Profile from "../../pages/authenticated/Profile/Profile";
import EditProfile from "../../pages/authenticated/Settings/EditProfile";
import Payments from "../../pages/authenticated/Settings/Payments";
import Faqs from "../../pages/authenticated/Supports/Faqs";
import ReportIssues from "../../pages/authenticated/Supports/ReportIssues";
import ReviewSession from "../../pages/authenticated/Sesssion/ReviewSession";
import ViewUpcomingSession from "../../pages/authenticated/Sesssion/ViewUpcomingSession";
import ScheduleSession from "../../pages/authenticated/Sesssion/ScheduleSession";
import EditSession from "../../pages/authenticated/Sesssion/EditSession";
import Earning from "../../pages/authenticated/Earning";
import ViewAdminReview from "../../pages/authenticated/Profile/Components/ViewAdminReview";

const Authenticated = () => {
  const [mobileNav, openMobileNav] = useState(false);

  return (
    <>
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-primary p-[22px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Header mobileNav={mobileNav} openMobileNav={openMobileNav} />
          <main className="w-full bg-white pt-5 lg:pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] mb-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore-sessions" element={<ExploreSession />} />
              <Route
                path="/explore-sessions/:id"
                element={<SessionDetails />}
              />
              <Route
                path="/recorded-sessions-details/:id"
                element={<SessionDetails />}
              />
              <Route path="/upcoming-sessions" element={<UpcomingSession />} />
              <Route path="/recorded-sessions" element={<RedcordedSession />} />
              <Route path="/schedule-sessions" element={<ScheduleSession />} />
              <Route
                path="/recorded-sessions/:id"
                element={<ReviewSession />}
              />
              <Route
                path="/upcoming-sessions/:id"
                element={<ViewUpcomingSession />}
              />
              <Route path="/schedule-sessions/:id" element={<EditSession />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/my-profile/:id" element={<ViewAdminReview />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/report-issues" element={<ReportIssues />} />
              <Route path="/earnings" element={<Earning />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Authenticated;
