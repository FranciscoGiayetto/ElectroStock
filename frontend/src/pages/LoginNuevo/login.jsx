import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import Logo from './logo';
import Link from 'antd/es/typography/Link';
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
        <section>
             <div>
      <Container>
        <Row>
          
          <Col xs={12} className="text-xs-center">
            <div className='top-left-image'><Logo/></div>
          
          </Col>
          <Col className="centered-form">
            <div className="login-container">
              <p className="login-heading"><b>Ingresá tus datos para<br/>iniciar sesión</b></p>
              <div className="login-form">
              <Form onSubmit={handleLogin}>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
        <Form.Label className='color'>Username</Form.Label>
        <Form.Control
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text" placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='color'>Password*</Form.Label>
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
      <div>
         
          <div className='text-center'>
              <Button className='text-center rounded-5 ' size='lg' style={{ backgroundColor: '#58A4B0', border: '1px solid #58A4B0'}} variant="primary" type="submit">
                Ingresar
          </Button>
          <Button className='text-center rounded-5 ' size='lg' style={{ backgroundColor: '#58A4B0', border: '1px solid #58A4B0'}} variant="primary" href='/signup'>
                Registrarse
          </Button>
        </div>
      </div>
    </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
            
        </section>
    );
};





  
export default Login;