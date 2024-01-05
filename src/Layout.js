import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import DashBoard from './component/Admin/Content/DashBoard';
import Login from './component/Auth/Login';
import App from './App';
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";
import DetailQuiz from "./component/User/DetailQuiz";
import ManageQuiz from "./component/Admin/Content/Quiz/ManageQuiz";
import Questions from "./component/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import React, { Suspense } from "react";

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404. Not found data
        </div>
    )
}

const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path="users" element={<ListQuiz />} /> */}
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>} />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register-user" element={<Register />} />
                <Route path="*" element={<NotFound />} />
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
        </Suspense>
    )
}

export default Layout;