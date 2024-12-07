import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Doctor/Login";
import Dashboard from "./components/userpage/Dashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientModule from "./components/Doctor/PatientModule";
import Password from "./components/userpage/Password";
import SignUp from "./components/userpage/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* User Dashboard */}
        <Route path="/UserDashboard" element={<Dashboard />} />

        {/* Doctor Dashboard */}
        <Route path="/DoctorDashboard" element={<DoctorDashboard />}>
          {/* Nested Routes for Sections */}
          <Route path="patient/:patientId" element={<PatientModule />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
