import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../../utils/auth';
import { containerClasses } from '@mui/material';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Container, Row, Col } from 'react-bootstrap';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ITSVlogin from '../../assets/ITSVlogin.svg';

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return (
        <Container className='font-family'>
            <Row>
                <div style={{marginTop:'20rem'}} className='text-center'>

                <p className='color' style={{textAlign:'left'}}> 
                    <p style={{fontSize:'1.4rem'}}>
                        Sesión cerrada
                    </p>
                    Cerraste sesión correctamente
                </p>

                <div className='text-center'>
                    
                    <Button
                        className='button-style'
                        style={{marginRight:'1rem'}}
                        variant='primary'
                        type='submit'
                        href='/login'
                    >
                    Iniciar sesión
                    </Button>

                    <Button
                    className='button-style'
                    variant='primary'
                    href='/signup'
                    >
                    Registrarse
                    </Button>
                </div>



                <div className='text-center'>
                    
                </div>

                </div>
            </Row>
            
        </Container>
    )
};

export default Logout;