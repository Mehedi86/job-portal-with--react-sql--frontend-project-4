import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:3000/api/applied/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppliedJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5">
        <p>Please log in to see your applied jobs.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading applied jobs...</p>
      </div>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="container mt-5">
        <p>You haven't applied for any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Your Applied Jobs</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.map((job, index) => (
            <tr key={job.application_id}>
              <td>{index + 1}</td>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.status}</td>
              <td>{new Date(job.applied_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;
