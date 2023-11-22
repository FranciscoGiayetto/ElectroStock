// CardMyData.js
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EditRoundedIcon from '@mui/icons-material/Edit';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LaunchRoundedIcon from '@mui/icons-material/Launch';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';

export default function CardMyData(props) {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [username, setUsername] = useState(props.username);
  const [userData, setUserData] = useState({ email: props.email, username: props.username }); // User data state

  const handleEmailUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/users/${props.id}/`, userData);
      setIsEditingEmail(false);
      props.setEmail(userData.email); // Actualizar el estado de email en el componente padre
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUsernameUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/users/${props.id}/`, userData);
      setIsEditingUsername(false);
      props.setUsername(userData.username); // Actualizar el estado de username en el componente padre
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <MDBCard className="card-user" alignment='left' border='none'>
      <MDBCardHeader className="card-header">
        Mis Datos
      </MDBCardHeader>

      <Table hover className="card-table">
        <tbody>
          <tr>
            <th scope='col'>Email:</th>
            {!isEditingEmail ? (
              <>
                <td scope='col'>{props.email}</td>
                <td scope='col'>
                  <Tooltip title="Editar" arrow placement="right">
                    <EditRoundedIcon style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} onClick={() => setIsEditingEmail(true)} />
                  </Tooltip>
                </td>
              </>
            ) : (
              <>
                <td scope='col'>
                  <input
                    type="text"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </td>
                <td scope='col'>
                  <Tooltip title="Guardar" arrow placement="right">
                    <CheckRoundedIcon
                      style={{ color: 'green', cursor: 'pointer', fontSize: '0.938rem' }}
                      onClick={handleEmailUpdate}
                    />
                  </Tooltip>
                  <Tooltip title="Cancelar" arrow placement="right">
                    <CloseRoundedIcon
                      style={{ color: 'red', cursor: 'pointer', fontSize: '0.938rem' }}
                      onClick={() => {
                        setIsEditingEmail(false);
                        setUserData({ ...userData, email: props.email });
                      }}
                    />
                  </Tooltip>
                </td>
              </>
            )}
          </tr>

          <tr>
            <th scope='col'>Usuario:</th>
            {!isEditingUsername ? (
              <>
                <td scope='col'>{props.username}</td>
                <td scope='col'>
                  <Tooltip title="Editar" arrow placement="right">
                    <EditRoundedIcon style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} onClick={() => setIsEditingUsername(true)} />
                  </Tooltip>
                </td>
              </>
            ) : (
              <>
                <td scope='col'>
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  />
                </td>
                <td scope='col'>
                  <Tooltip title="Guardar" arrow placement="right">
                    <CheckRoundedIcon
                      style={{ color: 'green', cursor: 'pointer', fontSize: '0.938rem' }}
                      onClick={handleUsernameUpdate}
                    />
                  </Tooltip>
                  <Tooltip title="Cancelar" arrow placement="right">
                    <CloseRoundedIcon
                      style={{ color: 'red', cursor: 'pointer', fontSize: '0.938rem' }}
                      onClick={() => {
                        setIsEditingUsername(false);
                        setUserData({ ...userData, username: props.username });
                      }}
                    />
                  </Tooltip>
                </td>
              </>
            )}
          </tr>

          <tr>
            <th scope='col'>Contraseña:</th>
            <td scope='col'>**********</td>
            <td scope='col'>
              <Tooltip title="Editar" arrow placement="right">
                <LaunchRoundedIcon onClick={() => { window.location.href = 'http://127.0.0.1:8000/auth/accounts/password_reset' }} style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} />
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </Table>
    </MDBCard>
  );
}
