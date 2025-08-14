import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import JobseekerProfile from "./components/JobseekerProfile";
import EditProfile from "./components/EditProfile";
import AppliedJobs from "./components/AppliedJobs";

const JobseekerDashboard = () => {
  const [loadPage, setLoadPage] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
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
      {/* Top Bar with Hamburger - Mobile Only */}
      {isMobile && (
        <div className="bg-dark p-2 text-white d-flex align-items-center">
          <button
            className="btn btn-dark p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          {/* <h5 className="ms-3 mb-0">Dashboard</h5> */}
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
              position: isMobile ? "fixed" : "sticky", // fixed for mobile
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 1000,
              overflowY: "auto", // scroll if content too big
            }}
          >
            {/* {!isMobile && <h4 className="mb-4">Dashboard</h4>} */}
            <nav className="nav flex-column">
              <button
                onClick={() => handleNavClick("profile")}
                className="btn bg-dark text-start text-white"
              >
                Profile
              </button>
              <button
                onClick={() => handleNavClick("editProfile")}
                className="btn bg-dark text-start text-white"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleNavClick("appliedJobs")}
                className="btn bg-dark text-start text-white"
              >
                Applied Jobs
              </button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-grow-1 px-4 pb-4">
          {loadPage === "profile" && <JobseekerProfile />}
          {loadPage === "editProfile" && <EditProfile />}
          {loadPage === "appliedJobs" && <AppliedJobs />}
        </div>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
