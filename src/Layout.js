import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import DashBoard from './component/Admin/Content/DashBoard';
import Login from './component/Auth/Login';
import App from './App';
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>

                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register-user" element={<Register />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout;