import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    if(user){
        return children
    }
    navigate('/login');
};

export default PrivateRoute;