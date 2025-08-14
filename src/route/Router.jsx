import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/Mainlayout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PostJobs from "../pages/PostJobs";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/jobs',
                element: <Jobs/>
            },{
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: '/postJob',
                element: <PrivateRoute><PostJobs/></PrivateRoute>
            }
        ]
    }
])