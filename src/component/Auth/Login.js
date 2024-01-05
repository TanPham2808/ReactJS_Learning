import { useState } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { postLogin } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/UserAction';
import { ImSpinner } from "react-icons/im";
import Language from '../Header/Language';

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isloading, setIsLoading] = useState(false);

    const handleLogin = async () => {

        // set biến trước khi gọi API
        setIsLoading(true);

        let res = await postLogin(email, password, 3000);

        if (res && res.EC === 0) {

            // Khai báo action (action là 1 object)
            dispatch(doLogin(res));

            // Set lại biến để tắt loading sau khi gọi API thành công
            setIsLoading(false);

            // Điều hướng 
            navigate("/");
        }
        else {
            toast.error(res.EM);
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet ?
                <button onClick={() => navigate('/register-user')}>Sign up</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                Tan Pham
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, who;s this ?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />

                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isloading}
                    >
                        {isloading && <ImSpinner className='loader-icon' />}
                        <span>Login to TanPham</span>

                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;