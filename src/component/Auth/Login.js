import { useState } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { postLogin } from '../../services/ApiServices';
import { toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleLogin = async () => {
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            navigate("/admins");
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet ?
                <button>Sign up</button>
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
                    />

                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button className='btn-submit' onClick={() => handleLogin()} >Login to TanPham</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;