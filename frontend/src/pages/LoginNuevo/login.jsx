import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Container, Row, Col } from 'react-bootstrap';
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
          
          <Col xs={12}>
            <div style={{justifyContent:'center', alignItems:'center'}}>
              <img src={ITSVlogin} alt="Logo"/>
            </div>
          </Col>
          <Col className="centered-form">
            <div className="login-container">
              <p className="login-heading">
                <b>Ingresá tus datos para<br/>iniciar sesión</b>
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
                    type="text" placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='color'>Contraseña *</Form.Label>
                    <Form.Control 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg" />
                  </Form.Group>

                  <div className='text-center' style={{paddingBottom:'1rem'}}>
                    <Link href='http://127.0.0.1:8000/auth/accounts/password_reset'>Olvidaste tu contraseña?</Link>
                  </div>

                  <div className='text-center'>
                    <Button
                      className='botonCarrito'
                      style={{ fontSize:'0.938rem', backgroundColor: '#58A4B0', border: 'none', width:'9.813rem', height:'2.5rem' }}
                      variant='primary'
                      type='submit'
                    >
                      Ingresar
                    </Button>
                  </div>
                  <div className='text-center' style={{marginTop:'.5rem'}}>
                    <Button
                      className='botonCarrito'
                      style={{ fontSize:'0.938rem', backgroundColor: '#58A4B0', border: 'none', width:'9.813rem', height:'2.5rem' }}
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