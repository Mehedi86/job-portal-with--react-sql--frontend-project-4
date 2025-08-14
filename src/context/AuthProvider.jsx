import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const retrieveUser = localStorage.getItem("user");
      if (retrieveUser) {
        setLoading(false)
        setUser(JSON.parse(retrieveUser));
      }
    } catch (err) {
      console.error("Invalid user data in localStorage:", err);
      localStorage.removeItem("user"); // clear bad data
      setUser(null);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const authInfo = {
    user,
    setUser,
    logout,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
