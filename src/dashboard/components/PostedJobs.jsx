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
      <h3>Posted Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
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
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>
                <td>{job.status}</td>
                <td>{job.description}</td>
                <td>{new Date(job.created_at).toLocaleString()}</td>
                <td>{new Date(job.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostedJobs;

