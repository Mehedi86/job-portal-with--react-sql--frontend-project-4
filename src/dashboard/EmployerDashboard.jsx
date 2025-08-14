import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import PostedJobs from "./components/PostedJobs";
import ManageJobs from "./components/ManageJobs";

const EmployerDashboard = () => {
    const [loadPage, setLoadPage] = useState("postedJobs");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
            setIsSidebarOpen(window.innerWidth > 1024);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavClick = (page) => {
        setLoadPage(page);
        if (isMobile) setIsSidebarOpen(false);
    };

    return (
        <div>
            {/* Top Bar for Mobile */}
            {isMobile && (
                <div className="bg-dark p-2 text-white d-flex align-items-center">
                    <button
                        className="btn btn-dark p-2"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            )}

            <div className="d-flex" style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                {(isSidebarOpen || !isMobile) && (
                    <div
                        className="bg-dark text-white p-3"
                        style={{
                            width: "250px",
                            height: "100vh",
                            position: isMobile ? "fixed" : "sticky",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            zIndex: 1000,
                            overflowY: "auto",
                        }}
                    >
                        <nav className="nav flex-column">
                            <button
                                onClick={() => handleNavClick("postedJobs")}
                                className="btn bg-dark text-start text-white"
                            >
                                Posted Jobs
                            </button>
                            <button
                                onClick={() => handleNavClick("manageJobs")}
                                className="btn bg-dark text-start text-white"
                            >
                                Manage Jobs
                            </button>
                        </nav>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-grow-1 px-4">
                    {loadPage === "postedJobs" && <PostedJobs />}
                    {loadPage === "manageJobs" && <ManageJobs />}
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
