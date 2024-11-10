import React from "react";
import Password from "./components/Password";
import Dashboard  from "./components/userpage/Dashboard";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Login/>}></Route> */}
             <Route path='/' element={<Dashboard/>}/>
              <Route path=':section' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
