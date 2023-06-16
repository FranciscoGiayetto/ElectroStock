import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../../utils/auth';

const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return (
        <div>
            <h1>Has Cerrado Sesion.</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
           
        </div>
    )
};

export default Logout;