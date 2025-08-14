import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const PostJobs = () => {
  const { user } = useContext(AuthContext);
  const { id: employerId } = user;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    company: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        employer_id: employerId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(`Error: ${data.error}`);
        } else {
          setMessage("Job posted successfully!");
          setFormData({
            title: "",
            description: "",
            category: "",
            location: "",
            company: ""
          });
        }
      })
      .catch((err) => {
        console.error("Error posting job:", err);
        setMessage("Something went wrong.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Post a Job</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobs;
