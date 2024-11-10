import React from "react";
import Appbar from "./Appbar";

import Footer from "./Footer";
import Consult from "./Consult";
import UserPage from "./UserPage";
import Resource from "./Resources";
import History from "./History";

export default function Dashboard() {
    return (
        <>
            <Appbar />
            <div className='container justify-content-center d-flex'>
                {/* <UserPage/> 
                 <Consult/> 
                 <Resource/> */}
                <History/>

            </div>
            <Footer/>
        </>
    );
}
