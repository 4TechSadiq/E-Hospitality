import React, { useState } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";
import Consult from "./Consult";
import UserPage from "./UserPage";
import Resource from "./Resources";
import History from "./History";
import AppointmentForm from "./AppointmentForm";

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('UserPage'); // Default to UserPage

    const renderSection = () => {
        switch (activeSection) {
            case 'Consult':
                return <Consult />;
            case 'MedicalHistory':
                return <History />;
            case 'Resources':
                return <Resource />;
            case 'AppointmentForm':
                return <AppointmentForm/>
            case 'UserPage':
            default:
                return <UserPage />;
        }
    };

    return (
        <>
            <Appbar onSelectSection={setActiveSection} /> {/* Passing setActiveSection function */}
            <div className="container justify-content-center">
                {renderSection()} 
            </div>
            <Footer />
        </>
    );
}
