import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DoctorLogin from "./components/Doctor/DoctorLogin";
import Dashboard from "./components/userpage/Dashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientModule from "./components/Doctor/PatientModule";
import SignUp from "./components/userpage/SignUp";
import AppointmentForm from "./components/userpage/AppointmentForm";
import Login from "./components/userpage/Login";
import UserPage from "./components/userpage/UserPage";

import {loadStripe} from '@stripe/stripe-js';
import AdminDashboard from "./components/Admin/AdminDashboard";
import FacilityManagement from "./components/Admin/FacilityManagement";
import DoctorList from "./components/Admin/DoctorList";
import UserList from "./components/Admin/UserList";
import AppointmentManagement from "./components/Admin/AppointmentManagement";
import SendNotification from "./components/Admin/SendNotification";
const stripe = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3", {
  betas: ['custom_checkout_beta_5'],
});

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Admin" element={<AdminDashboard />}>
          <Route path="doctors" element={<DoctorList />} />
          <Route path="users" element={<UserList />} />
          <Route path="facilities" element={<FacilityManagement />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="sendnotification" element={<SendNotification />} />

        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AppointmentForm" element={<AppointmentForm />} />
        <Route path="/Doc-login" element={<DoctorLogin />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/UserDashboard/:userId" element={<Dashboard />} />
        <Route path="/DoctorDashboard/:doc_id" element={<DoctorDashboard />}>
          <Route path="History" element={<DoctorDashboard />} />
          <Route path="Newfeed" element={<DoctorDashboard />} />
          <Route path="AddMedication" element={<DoctorDashboard />} />
          <Route path="patient/:patientId" element={<PatientModule />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
