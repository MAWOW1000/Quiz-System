import { useState } from 'react';
import './Admin.scss'
import SideBar from "./SideBar/SideBar";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

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
        </div>
    );
}

export default Admin;