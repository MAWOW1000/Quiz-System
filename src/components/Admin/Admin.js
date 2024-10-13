import { useState } from 'react';
import './Admin.scss'
import SideBar from "./SideBar/SideBar";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="adminContainer">
            <div className="sidebar" >
                <SideBar collapsed={collapsed} />
            </div>
            <div className="main">
                <div className='mainHeader'>
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className='mainContent'>
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}>
            </ToastContainer>
        </div>
    );
}

export default Admin;