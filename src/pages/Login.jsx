import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const { setUser, user, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }

                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                toast.success("Login successful!");
                navigate('/');
                setLoading(false)
            })
            .catch(() => toast.error("Something went wrong!"));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            <form onSubmit={handleLogin}>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>

                            {/* Show logged in user */}
                            {user && (
                                <div className="mt-3">
                                    <p>Welcome, <strong>{user.name}</strong>!</p>
                                    <p>Email: {user.email}</p>
                                    <p>Role: {user.role}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
