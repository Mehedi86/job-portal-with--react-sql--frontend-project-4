import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Home = () => {
    const { user } = useContext(AuthContext);
    const { name } = user || {}

    if (user?.role == 'employer') {
        return (
            <div>
                <div className="bg-yellow-100 p-3 rounded text-center text-sm text-yellow-800">
                    <h2>Welcome <span className='text-info'>{name}</span> to our Job Portal!! </h2>
                    <p>Want to post a job Advertise !!</p>
                </div>
                <div className="w-100 text-center">
                    <Link to="/jobs" className="btn btn-danger">Let's Go</Link>
                </div>
            </div>)
    }
    else if (user?.role == 'jobseeker') {
        return (
            <div>
                <div className="bg-yellow-100 p-3 rounded text-center text-sm text-yellow-800">
                    <h2>Welcome <span className='text-info'>{name}</span> to our Job Portal!! </h2>
                    <p>Want to explore available jobs!!</p>
                </div>
                <div className="w-100 text-center">
                    <Link to="/jobs" className="btn btn-danger">Explore Jobs</Link>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="bg-yellow-100 p-3 rounded text-center text-sm text-yellow-800">
                    <h2>Welcome to our Job Portal!! </h2>
                    <p>Want to explore available jobs!!</p>
                </div>
                <div className="w-100 text-center">
                    <h4>Please login to see the exiting job opportunity available here or <br /> post a job for hire right candidate for your company.</h4>
                </div>
            </div>)
    }

};

export default Home;