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
// import ScheduleSession from "../../pages/authenticated/Sesssion/ScheduleSession";
import EditSession from "../../pages/authenticated/Admin/Session/EditSession";
import Earning from "../../pages/authenticated/Earning";
import ViewAdminReview from "../../pages/authenticated/Profile/ViewAdminReview";
import { ProfileTypes } from "../../types/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TutorDashboard from "../../pages/authenticated/Dashboard/TutorDashbaord";
import PreviewSession from "../../pages/authenticated/Sesssion/PreviewSession";
import UpcomingSessionTutor from "../../pages/authenticated/Sesssion/UpcomingSessionsTutor";
import AdminDashboard from "../../pages/authenticated/Admin/Dashboard/AdminDashboard";
import ManageStudents from "../../pages/authenticated/Admin/ManageStudents/ManageStudents";
import ManageAdmin from "../../pages/authenticated/Admin/ManageAdmin/ManageAdmin";
import Curriculum from "../../pages/authenticated/Admin/Curriculum/Curriculum";
import ManagePayments from "../../pages/authenticated/Admin/ManagePayments/ManagePayments";
import ScheduleSession from "../../pages/authenticated/Admin/Session/ScheduleSession";
import ManageRecordedSession from "../../pages/authenticated/Admin/Session/ManageRecordedSession";
import ManageUpcomingSession from "../../pages/authenticated/Admin/Session/ManageUpcomingSession";
import CreateStudent from "../../pages/authenticated/Admin/ManageStudents/CreateStudent";
import ManageTutors from "../../pages/authenticated/Admin/ManageTutors/ManageTutors";
import ManageIssues from "../../pages/authenticated/Admin/ManageIssues/ManageIssues";
import ViewTutor from "../../pages/authenticated/Admin/ManageTutors/ViewTutor";
import ViewStudent from "../../pages/authenticated/Admin/ManageStudents/ViewStudent";
import RecordedSessionDetails from "../../pages/authenticated/Admin/Session/RecordedSessionDetails";
import Subscriptions from "../../pages/authenticated/Admin/Subscriptions/Subscriptions";
import ManageSessionRequest from "../../pages/authenticated/Admin/Session/ManageSessionRequest";
import PaymentSuccess from "../../pages/authenticated/Settings/PaymentSuccess";
import AdminNotification from "../../pages/authenticated/Admin/AdminNotification/AdminNotification";

const Authenticated = () => {
  const [mobileNav, openMobileNav] = useState(false);

  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <>
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-primary p-[22px]">
          <Sidebar openMobileNav={openMobileNav} />
        </div>
        <div className="w-full">
          <Header mobileNav={mobileNav} openMobileNav={openMobileNav} />
          <main className="w-full bg-white pt-5 lg:pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] mb-10">
            <Routes>
              <Route
                path="/"
                element={
                  userData?.accountType === "student" ? (
                    <Dashboard />
                  ) : userData?.accountType === "tutor" ? (
                    <TutorDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  userData?.accountType === "student" ? (
                    <Dashboard />
                  ) : userData?.accountType === "tutor" ? (
                    <TutorDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                }
              />
              <Route path="/explore-sessions" element={<ExploreSession />} />
              <Route
                path="/explore-sessions/:id"
                element={<SessionDetails />}
              />
              <Route
                path="/schedule-sessions/:slug"
                element={<PreviewSession />}
              />
              <Route
                path="/recorded-sessions-details/:id"
                element={<SessionDetails />}
              />
              <Route
                path="/upcoming-sessions"
                element={
                  userData?.accountType === "student" ? (
                    <UpcomingSession />
                  ) : (
                    <UpcomingSessionTutor />
                  )
                }
              />
              <Route path="/recorded-sessions" element={<RedcordedSession />} />
              <Route
                path="/recorded-sessions/:id"
                element={<ReviewSession />}
              />
              <Route
                path="/upcoming-sessions/:id"
                element={<ViewUpcomingSession />}
              />
              <Route
                path="/schedule-sessions/edit/:id"
                element={<EditSession />}
              />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/my-profile/:id" element={<ViewAdminReview />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/report-issues" element={<ReportIssues />} />
              <Route path="/earnings" element={<Earning />} />

              {/* Admin Pages */}
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/manage-students" element={<ManageStudents />} />
              <Route path="/manage-admins" element={<ManageAdmin />} />
              <Route path="/manage-payments" element={<ManagePayments />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/schedule-sessions" element={<ScheduleSession />} />
              <Route
                path="/manage-recorded-sessions"
                element={<ManageRecordedSession />}
              />
              <Route
                path="/manage-recorded-sessions/details"
                element={<RecordedSessionDetails />}
              />
              <Route
                path="/manage-upcoming-sessions"
                element={<ManageUpcomingSession />}
              />
              <Route
                path="/manage-session-requests"
                element={<ManageSessionRequest />}
              />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route
                path="/manage-students/create-student"
                element={<CreateStudent />}
              />
              <Route
                path="/manage-students/view-student"
                element={<ViewStudent />}
              />
              <Route path="/manage-tutors" element={<ManageTutors />} />
              <Route path="/manage-tutors/view-tutor" element={<ViewTutor />} />
              <Route path="/manage-issues" element={<ManageIssues />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="user/payment-success" element={<PaymentSuccess />} />
              <Route path="/admin-notifications" element={<AdminNotification />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Authenticated;
