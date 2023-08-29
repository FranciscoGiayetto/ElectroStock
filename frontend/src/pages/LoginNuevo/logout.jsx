import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../../utils/auth';
import { Button } from 'react-bootstrap';
const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return (
        <div>
            <h1>Has Cerrado Sesion.</h1>
            <div style={{"paddingTop":"3rem","paddingBottom":"3rem", "width":"80%"}}>
            <Link to="/login">
                <Button>Login</Button>
            
            </Link>
            </div>
            <div>
            <Link to="/signup">
                <Button>Signup (Profesores)</Button>
            </Link>
            </div>
        </div>
    )
};

export default Logout;