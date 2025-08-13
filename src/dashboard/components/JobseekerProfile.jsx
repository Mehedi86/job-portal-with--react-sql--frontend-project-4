import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const JobseekerProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) return; // Prevent fetch if user is null

    fetch(`http://localhost:3000/api/jobseeker/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (Object.keys(profile).length === 0) {
    return (
      <div className="container mt-5">
        <p>No profile found. Please create one.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Jobseeker Profile</h3>
      <div className="card p-3 shadow-sm">
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Education:</strong> {profile.education}</p>
        <p><strong>Experience:</strong> {profile.experience}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        {profile.resume_path && (
          <p>
            <strong>Resume:</strong>{" "}
            <a
              href={profile.resume_path}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </p>
        )}
        <p><strong>Created At:</strong> {new Date(profile.created_at).toLocaleString()}</p>
        <p><strong>Last Updated:</strong> {new Date(profile.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default JobseekerProfile;
