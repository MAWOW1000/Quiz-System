import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Content/Dashboard/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser/ManageUser';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import App from './App';
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='/user' element={<User />} />
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<Signup />} />
            </Routes>
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
        </>
    );
}

export default Layout;