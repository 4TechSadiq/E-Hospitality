import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Doctor/Login";
import Dashboard from "./components/userpage/Dashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientModule from "./components/Doctor/PatientModule";
import Password from "./components/userpage/Password";
import SignUp from "./components/userpage/SignUp";
import AppointmentForm from "./components/userpage/AppointmentForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AppointmentForm" element={<AppointmentForm/>}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/UserDashboard" element={<Dashboard />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard />}>
          <Route path="patient/:patientId" element={<PatientModule />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
