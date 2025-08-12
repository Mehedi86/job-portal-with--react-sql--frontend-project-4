import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const JobCards = ({ job }) => {
  const {
    category,
    created_at,
    description,
    location,
    status,
    title
  } = job;

  return (
    <div className="card shadow-sm border-0 mb-4" style={{ width: "22rem" }}>
      <div className="card-body">
        {/* Job Title */}
        <h5 className="card-title fw-bold text-primary">{title}</h5>
        
        {/* Category & Status */}
        <div className="d-flex justify-content-between mb-2">
          <span className="badge bg-info">{category}</span>
          <span
            className={`badge ${status === "open" ? "bg-success" : "bg-secondary"}`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="card-text text-muted">{description}</p>

        {/* Location & Date */}
        <div className="d-flex justify-content-between align-items-center text-muted small">
          <span><i className="bi bi-geo-alt-fill me-1"></i> {location}</span>
          <span>{new Date(created_at).toLocaleDateString()}</span>
        </div>

        {/* Apply Button */}
        <div className="mt-3">
          <button className="btn btn-outline-primary btn-sm w-100">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCards;
