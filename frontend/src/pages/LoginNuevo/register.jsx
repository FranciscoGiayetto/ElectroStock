import React, { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAuthStore } from '../../store/auth';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import ITSVlogin from '../../assets/ITSVlogin.svg';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState('');
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState('');
  const [specialitiesList, setSpecialitiesList] = useState([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [secretTokenField, setSecretTokenField] = useState('');
  const secretToken = "genari";
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    getSpecialities();
  }, []);

  const getSpecialities = () => {
    let data = [
      {
        "id": 1,
        "name": "Electronica"
      },
      {
        "id": 2,
        "name": "Programación"
      },
      {
        "id": 3,
        "name": "Electromecánica"
      }
    ];
    setSpecialitiesList(data);
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setPassword2('');
    setSecretTokenField('');
    setEmail('');
    setSelectedSpecialities([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (secretTokenField === secretToken) {
      const { error } = await register(username, password, password2, email, selectedSpecialities);
      if (error) {
        alert(JSON.stringify(error));
      } else {
        navigate('/');
        resetForm();
      }
    } else {
      alert("Token Secreto Incorrecto");
    }
  };

  const handleSpecialityChange = (selectedId) => {
    if (selectedSpecialities.includes(selectedId)) {
      setSelectedSpecialities(prevSelected => prevSelected.filter(id => id !== selectedId));
    } else {
      setSelectedSpecialities(prevSelected => [...prevSelected, selectedId]);
    }
  };

  return (
    <section>
      <Container className='font-family'>
        <Row>
          <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '4rem' }}>
              <img src={ITSVlogin} alt="Logo" style={{ width: '10rem' }} />
            </div>
          </Col>
          <Col className="centered-form">
            <div className="login-container">
              <p className="login-heading">Ingresá tus datos para<br />registrarte</p>
              <div className="login-form">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='color'>Nombre</Form.Label>
                    <Form.Control
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Nombre de usuario"
                      className="input-style"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='color'>Email</Form.Label>
                    <Form.Control
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="ejemplo@gmail.com"
                      className="input-style"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='color'>Contraseña *</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="input-style"
                      />
                    </div>
                  </Form.Group>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setShowPassword(!showPassword)}
                            variant="light"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            {showPassword ? <VisibilityRoundedIcon style={{ fontSize: '1rem' }} /> : <VisibilityOffRoundedIcon style={{ fontSize: '1rem' }} />}
                        </Button>
                        <p style={{ margin: '0 0 0 0.3rem', fontSize: '0.875rem', opacity:'70%' }}>Mostrar Contraseña</p>
                    </div>

                  <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:'1rem'}}>
                    <Form.Label className='color'>Repetir Contraseña *</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
                        type={showPassword2 ? 'text' : 'password'}
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Contraseña"
                        className="input-style"
                      />
                    </div>
                  </Form.Group>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setShowPassword2(!showPassword2)}
                            variant="light"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            {showPassword2 ? <VisibilityRoundedIcon style={{ fontSize: '1rem' }} /> : <VisibilityOffRoundedIcon style={{ fontSize: '1rem' }} />}
                        </Button>
                        <p style={{ margin: '0 0 0 0.3rem', fontSize: '0.875rem', opacity:'70%' }}>Mostrar Contraseña</p>
                    </div>


                    
                  <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:'1rem'}}>
                    <Form.Label className='color'>Token *</Form.Label>
                    <Form.Control
                      type="password"
                      id="secretTokenField"
                      name="secretTokenField"
                      value={secretTokenField}
                      onChange={(e) => setSecretTokenField(e.target.value)}
                      placeholder="Token único proveído por el profesor"
                      className="input-style"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicSpecialities">
                    <Form.Label className='color'>Especialidad *</Form.Label>
                    {specialitiesList.map(speciality => (
                      <div key={speciality.id} className="input-style custom-checkbox">
                        <input
                          type="checkbox"
                          id={`speciality-${speciality.id}`}
                          value={speciality.id}
                          checked={selectedSpecialities.includes(speciality.id)}
                          onChange={() => handleSpecialityChange(speciality.id)}
                          className="input-style-checkbox"
                        />
                        <label htmlFor={`speciality-${speciality.id}`} className="input-style-label">
                          {speciality.name}
                        </label>
                      </div>
                    ))}
                  </Form.Group>

                  <div>
                    <div className='text-center' style={{ marginTop: "1rem", marginBottom: '1rem' }}>
                      <Button className='button-style' variant="primary" type="submit">
                        Crear Cuenta
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Register;
