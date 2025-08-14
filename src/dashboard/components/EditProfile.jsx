import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    resume_path: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:3000/api/jobseeker/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            phone: data.phone || "",
            address: data.address || "",
            resume_path: data.resume_path || "",
            skills: data.skills || "",
            experience: data.experience || "",
            education: data.education || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/jobseeker/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Profile updated successfully!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <p>Please log in to edit your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Edit Jobseeker Profile</h3>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Education</label>
          <input
            type="text"
            className="form-control"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <textarea
            className="form-control"
            name="experience"
            rows="3"
            value={formData.experience}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <textarea
            className="form-control"
            name="skills"
            rows="3"
            value={formData.skills}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Resume Link</label>
          <input
            type="text"
            className="form-control"
            name="resume_path"
            value={formData.resume_path}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
