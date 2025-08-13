import React, { useState } from "react";
import JobseekerProfile from "./components/JobseekerProfile";
import EditProfile from "./components/EditProfile";
import AppliedJobs from "./components/AppliedJobs";

const JobseekerDashboard = () => {
    const [loadPage, setLoadPage] = useState('profile');

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="mb-4">Dashboard</h4>
        <nav className="nav flex-column">
          <button onClick={()=> setLoadPage('profile')} className="btn bg-dark text-start text-white">
            Profile
          </button>
          <button onClick={()=> setLoadPage('editProfile')} className="btn bg-dark text-start text-white">
            Edit Profile
          </button>
          <button onClick={()=> setLoadPage('appliedJobs')} className="btn bg-dark text-start text-white">
            Applied Jobs
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {loadPage == 'profile' && <JobseekerProfile/>}
        {loadPage == 'editProfile' && <EditProfile/>}
        {loadPage == 'appliedJobs' && <AppliedJobs/>}
        
      </div>
    </div>
  );
};

export default JobseekerDashboard;
