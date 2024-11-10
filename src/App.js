import React from "react";
import Password from "./components/userpage/Password";
import Dashboard  from "./components/userpage/Dashboard";
import SignUp from "./components/userpage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Doctor/Login";

function App() {
  return (
    <>
    <Login/>
    {/* <BrowserRouter>
          <Routes>
             <Route path='/' element={<Login/>}></Route>
             <Route path='/UserDashboard' element={<Dashboard/>}/>
             <Route></Route>
          </Routes>
    </BrowserRouter> */}
    </>
  );
}

export default App;
