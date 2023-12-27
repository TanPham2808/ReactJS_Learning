
import imageRegister from '../../assets/register-image.jpg';
import { useNavigate } from "react-router-dom";
import './style.scss';
import { useState } from 'react';

const Register = () => {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        alert('clickme');
    }

    return (
        <div className='register-page'>
            <section style={{ paddingTop: '5%' }} className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form">
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        value={userName}
                                        onChange={(event) => { setUserName(event.target.value) }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-email"></i></label>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        className="form-submit"
                                        value="Register"
                                        onClick={(event) => { handleRegister(event) }}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={imageRegister} alt="sing up image" /></figure>
                            <span className="signup-image-link" onClick={() => navigate("/")}>&#60;&#60; Go to Homepage</span>
                        </div>
                    </div>
                </div>

            </section>
        </div>

    )
}

export default Register;