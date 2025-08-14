import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const PostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/api/employer/${user.id}/jobs`)
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h3 className="mb-3 text-center text-lg-start">Posted Jobs</h3>
      {jobs.length === 0 ? (
        <p className="text-center">No jobs posted yet.</p>
      ) : (
        <>
          {/* TABLE VIEW for md and larger */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.job_id}>
                    <td className="text-break">{job.title}</td>
                    <td className="text-break">{job.company}</td>
                    <td>{job.category}</td>
                    <td>{job.location}</td>
                    <td>
                      <span
                        className={`badge ${
                          job.status === "open"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="text-break" style={{ maxWidth: "200px" }}>
                      {job.description}
                    </td>
                    <td>{new Date(job.created_at).toLocaleString()}</td>
                    <td>{new Date(job.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD VIEW for small screens */}
          <div className="d-md-none">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="card mb-3 shadow-sm border-0"
              >
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.company} • {job.location}
                  </h6>
                  <p className="mb-1">
                    <strong>Category:</strong> {job.category}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        job.status === "open"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Description:</strong> {job.description}
                  </p>
                  <small className="text-muted">
                    Created: {new Date(job.created_at).toLocaleString()}
                    <br />
                    Updated: {new Date(job.updated_at).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostedJobs;
