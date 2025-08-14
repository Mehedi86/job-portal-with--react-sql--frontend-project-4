import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.setItem("user", JSON.stringify(null));
        logout();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand fw-bold" to="/">
                    JobPortal
                </Link>

                {/* Menu Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Items */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user && <li className="nav-item d-flex align-items-center">
                            <span className="nav-link px-3 py-1 bg-light rounded shadow-sm fw-medium text-dark">
                                {user?.name}
                            </span>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                       {user?.role == 'jobseeker' &&  <li className="nav-item">
                            <Link className="nav-link" to="/jobs">Jobs</Link>
                        </li>}
                        {user?.role == 'employer' && <li className="nav-item">
                            <Link to="/postJob" className="nav-link">Post a Job</Link>
                        </li>}
                        {user && <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="d-flex ms-lg-3 mt-2 mt-lg-0">
                        {user ? <button onClick={handleLogout} className="btn btn-warning">
                            Logout
                        </button> : (<> <Link to="/login" className="btn btn-outline-light me-2">
                            Login
                        </Link>
                            <Link to="/register" className="btn btn-warning">
                                Register
                            </Link></>)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
