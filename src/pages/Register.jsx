import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";


const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;

    const registerData = {
      name,
      email,
      password,
      role,
      email_verified: 1, // static
    };

    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      let resultData = null;
      try {
        resultData = await response.json();
      } catch {
        resultData = { error: "No JSON response" };
      }

      if (!response.ok) {
        console.error("Registration error:", resultData);
        toast.error(resultData.error || "Registration failed!");
        return;
      }

      console.log("User registered:", resultData);
      toast.success("Registration successful!");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>
              <form onSubmit={handleRegister}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Select Role</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="employer"
                      name="role"
                      value="employer"
                      required
                    />
                    <label className="form-check-label" htmlFor="employer">
                      Employer
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="jobseeker"
                      name="role"
                      value="jobseeker"
                      required
                    />
                    <label className="form-check-label" htmlFor="jobseeker">
                      Jobseeker
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
