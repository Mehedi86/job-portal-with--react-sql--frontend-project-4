import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const retriveUser = localStorage.getItem('user');
        if (retriveUser) {
            setUser(JSON.parse(retriveUser));
        }
    }, [])

    const logout = () => setUser(null);

    const authInfo = {
        user,
        setUser,
        logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
