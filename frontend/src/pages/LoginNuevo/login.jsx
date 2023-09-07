import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Container, Row, Col } from 'react-bootstrap';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ITSVlogin from '../../assets/ITSVlogin.svg';
import Link from 'antd/es/typography/Link';


<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await login(username, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
    };
    return (
        
      <Container style={{fontFamily:'Roboto, sans-serif'}} >
        <Row>          
          <Col xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{marginTop:'4rem'}}>
              <img src={ITSVlogin} alt="Logo" style={{width:'10rem'}}/>
            </div>
          </Col>
          <Col className="centered-form">
            <div className="login-container">
              <p className="login-heading">
                Ingresá tus datos para<br/>iniciar sesión
              </p>
              <div className="login-form">
                <Form onSubmit={handleLogin}>

                  <Form.Group  className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='color'>Nombre *</Form.Label>
                    <Form.Control
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" placeholder="Nombre de usuario" className="input-style"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='color'>Contraseña *</Form.Label>
                    <Form.Control 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña" className="input-style" />
                  </Form.Group>

                  <div className='text-center' style={{paddingBottom:'1rem'}}>
                    <Link href='http://127.0.0.1:8000/auth/accounts/password_reset' style={{color:' #2E5266'}} > Olvidaste tu contraseña? </Link>
                  </div>
                  
                  <div className='text-center'>
                    <Button
                      className='button-style'
                      variant='primary'
                      type='submit'
                    >
                      Ingresar
                    </Button>
                  </div>

                  <div className='div-hr'>
                    <hr className='hr-style'/>
                  </div>

                  <div className='text-center'>
                    <Button
                      className='button-style'
                      variant='primary'
                      href='/signup'
                    >
                      Registrarse
                    </Button>
                  </div>
                    
                    
                  
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    );
};

export default Login;