import React, { useEffect, useState } from "react";
import JobCards from "../components/JobCards";
import "bootstrap/dist/css/bootstrap.min.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Available Jobs</h2>
      <div className="row g-4">
        {jobs.map((job) => (
          <div key={job.id} className="col-12 col-sm-6 col-lg-4 d-flex">
            <JobCards job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
