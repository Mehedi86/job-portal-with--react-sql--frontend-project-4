import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
// import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            {/* <Footer/> */}
             <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default MainLayout;