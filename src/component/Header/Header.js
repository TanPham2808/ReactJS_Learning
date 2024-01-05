import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/UserAction';
import Language from './Language';

const Header = () => {

    // lấy data trong state của redux ra 
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register-user");
    }

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            // clear data redux
            dispatch(doLogout());

            // Redirect
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand'>Tan Pham</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admins" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav className='container-button-homepage'>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { handleLogout() }}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;