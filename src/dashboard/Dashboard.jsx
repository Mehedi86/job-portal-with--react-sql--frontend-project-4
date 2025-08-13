import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import EmployerDashboard from "./EmployerDashboard";
import JobseekerDashboard from "./JobseekerDashboard";


const Dashboard = () => {
    const {user} = useContext(AuthContext);

    if(user?.role == 'employer'){
        return <EmployerDashboard/>
    }
    else{
        return <JobseekerDashboard/>
    }
};

export default Dashboard;



// import React from "react";


// const Login = () => {

//     return (
//         <div className="container mt-5">

//         </div>
//     );
// };

// export default Login;