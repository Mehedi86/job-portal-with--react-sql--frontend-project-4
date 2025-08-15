import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const JobDetails = () => {
    const { id } = useParams(); // job id
    const { user } = useContext(AuthContext); // user object from context
    const userId = user?.id; // safely access id
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/jobs")
            .then((res) => res.json())
            .then((data) => {
                const foundJob = data.find((job) => job.id == id);
                setJob(foundJob || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container mt-5">Loading job details...</div>;
    }

    if (!job) {
        return <div className="container mt-5">Job not found</div>;
    }

    const handleApply = async () => {
        if (!userId) {
            toast.error("Please log in to apply for this job.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/job-applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    job_id: job.id,
                    job_seeker_id: userId
                })
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Failed to apply");
                return;
            }
            navigate('/jobs')
            toast.success("Application submitted successfully!");
        } catch (error) {
            console.error("Error applying:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mt-5 pb-4">
            {/* Job Title & Company */}
            <div className="bg-light p-4 rounded shadow-sm mb-4">
                <h2>{job.title}</h2>
                <h5 className="text-muted">{job.company}</h5>
                <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                <p className="mb-1"><strong>Category:</strong> {job.category}</p>
                <p className="mb-1"><strong>Status:</strong> {job.status}</p>
                <p className="text-secondary">
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                </p>
            </div>

            {/* Job Overview */}
            <section className="mb-4">
                <h4>Job Overview</h4>
                <p>{job.description}</p>
                <p>
                    In this role, you will be responsible for contributing to the growth
                    and success of our organization. The ideal candidate will have strong
                    analytical skills, problem-solving ability, and the passion to work
                    in a dynamic environment.
                </p>
            </section>

            {/* Requirements */}
            <section className="mb-4">
                <h4>Requirements</h4>
                <ul>
                    <li>Bachelor’s degree in a relevant field</li>
                    <li>At least 1-3 years of professional experience</li>
                    <li>Strong communication and teamwork skills</li>
                    <li>Ability to work independently and meet deadlines</li>
                    <li>Familiarity with industry trends and tools</li>
                </ul>
            </section>

            {/* Benefits */}
            <section className="mb-4">
                <h4>Benefits</h4>
                <ul>
                    <li>Competitive salary package</li>
                    <li>Health and wellness benefits</li>
                    <li>Opportunities for career growth</li>
                    <li>Friendly and collaborative team environment</li>
                </ul>
            </section>

            {/* About Company */}
            <section className="mb-4">
                <h4>About {job.company}</h4>
                <p>
                    {job.company} is committed to delivering high-quality services and
                    creating innovative solutions. We believe in empowering our employees
                    to achieve their full potential through continuous learning and
                    development.
                </p>
            </section>

            {/* Apply Button */}
            <div className="text-center">
                {userId ? (
                    <button
                        onClick={handleApply}
                        className="btn btn-primary btn-lg"
                        disabled={job.status !== "open"}
                    >
                        {job.status === "open" ? "Apply Now" : "Closed"}
                    </button>
                ) : (
                    <p className="text-muted">
                        Please <a href="/login">log in</a> to apply for this job.
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
