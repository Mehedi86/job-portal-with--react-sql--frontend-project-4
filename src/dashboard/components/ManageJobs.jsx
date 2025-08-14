import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const ManageJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    if (user && user.id) {
      fetch(`http://localhost:3000/api/employer/${user.id}/jobs`)
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const updateStatus = (jobId, status) => {
    fetch(`http://localhost:3000/api/job/${jobId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => fetchJobs()) // Refresh table after update
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h3>Manage Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    disabled={job.status === "open"}
                    onClick={() => updateStatus(job.job_id, "open")}
                  >
                    Open
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={job.status === "closed"}
                    onClick={() => updateStatus(job.job_id, "closed")}
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageJobs;
