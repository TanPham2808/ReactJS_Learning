import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

    // Lấy từ trong redux ra
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // Chưa xác thực thì đá về login
    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>
    }
    return (
        <>
            {/* Thằng cha phải gọi đến chilren để render ra thằng con bên trong */}
            {props.children}
        </>
    )
}

export default PrivateRoute