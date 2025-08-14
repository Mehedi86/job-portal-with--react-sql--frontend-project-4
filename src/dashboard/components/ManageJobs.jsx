import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const ManageJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <h3 className="mb-3 text-center text-lg-start">Manage Jobs</h3>

      {jobs.length === 0 ? (
        <p className="text-center">No jobs posted yet.</p>
      ) : isMobile ? (
        // 📱 Mobile: Card view
        <div className="d-flex flex-column gap-3">
          {jobs.map((job) => (
            <div key={job.job_id} className="card shadow-sm p-3">
              <h5 className="mb-1">{job.title}</h5>
              <p className="mb-1 text-muted">Category: {job.category}</p>
              <p className="mb-2">
                Status:{" "}
                <span
                  className={`badge ${
                    job.status === "open" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {job.status}
                </span>
              </p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm flex-fill"
                  disabled={job.status === "open"}
                  onClick={() => updateStatus(job.job_id, "open")}
                >
                  Open
                </button>
                <button
                  className="btn btn-danger btn-sm flex-fill"
                  disabled={job.status === "closed"}
                  onClick={() => updateStatus(job.job_id, "closed")}
                >
                  Close
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 💻 Desktop: Table view
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
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
                  <td className="text-break">{job.title}</td>
                  <td className="text-break">{job.category}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.status === "open" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-success btn-sm flex-fill"
                      disabled={job.status === "open"}
                      onClick={() => updateStatus(job.job_id, "open")}
                    >
                      Open
                    </button>
                    <button
                      className="btn btn-danger btn-sm flex-fill"
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
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
