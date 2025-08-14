import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const JobApplications = () => {
  const { user } = useContext(AuthContext);
  const { id: employerId } = user;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employerId) {
      fetch(`http://localhost:3000/api/employer/${employerId}/job-applications`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching job applications:", err);
          setLoading(false);
        });
    }
  }, [employerId]);

  if (loading) return <div className="container mt-5">Loading...</div>;

  // Group by job
  const grouped = applications.reduce((acc, app) => {
    if (!acc[app.job_id]) acc[app.job_id] = { job: app, applicants: [] };
    if (app.job_seeker_id) {
      acc[app.job_id].applicants.push(app);
    }
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2>My Posted Jobs & Applications</h2>
      {Object.values(grouped).map(({ job, applicants }) => (
        <div key={job.job_id} className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{job.title} ({job.company})</h5>
            <p className="card-text">
              <strong>Location:</strong> {job.location} <br />
              <strong>Status:</strong> {job.job_status}
            </p>
            <h6>Applicants:</h6>

            {/* Large screen table view */}
            <div className="d-none d-lg-block">
              {applicants.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Skills</th>
                      <th>Experience</th>
                      <th>Applied At</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((a) => (
                      <tr key={a.application_id}>
                        <td>{a.job_seeker_name}</td>
                        <td>{a.job_seeker_email}</td>
                        <td>{a.phone || "N/A"}</td>
                        <td>{a.skills || "N/A"}</td>
                        <td>{a.experience || "N/A"}</td>
                        <td>{new Date(a.applied_at).toLocaleString()}</td>
                        <td>{a.application_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No applicants yet.</p>
              )}
            </div>

            {/* Small screen card view */}
            <div className="d-lg-none">
              {applicants.length > 0 ? (
                applicants.map((a) => (
                  <div key={a.application_id} className="border rounded p-3 mb-3 shadow-sm">
                    <p><strong>Name:</strong> {a.job_seeker_name}</p>
                    <p><strong>Email:</strong> {a.job_seeker_email}</p>
                    <p><strong>Phone:</strong> {a.phone || "N/A"}</p>
                    <p><strong>Skills:</strong> {a.skills || "N/A"}</p>
                    <p><strong>Experience:</strong> {a.experience || "N/A"}</p>
                    <p><strong>Applied At:</strong> {new Date(a.applied_at).toLocaleString()}</p>
                    <p><strong>Status:</strong> {a.application_status}</p>
                  </div>
                ))
              ) : (
                <p>No applicants yet.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplications;
