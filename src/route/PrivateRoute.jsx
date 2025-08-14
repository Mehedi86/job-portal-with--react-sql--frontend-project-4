import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Please wait...</p>; // show a loader while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children; // render protected content if user exists
};

export default PrivateRoute;
