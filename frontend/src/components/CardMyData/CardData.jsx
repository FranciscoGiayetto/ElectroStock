import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EditRoundedIcon from '@mui/icons-material/Edit';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';

export default function CardMyData(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(props.email);
  const [editedUsername, setEditedUsername] = useState(props.username);
  const [editedPassword, setEditedPassword] = useState('**********'); // Por seguridad, no almacenes contraseñas en texto claro.

  const handleEdit = (field) => {
    if (field === 'email') {
      setEditedEmail(props.email); // Restablecer el campo editado al valor original al cancelar.
    } else if (field === 'username') {
      setEditedUsername(props.username);
    } else if (field === 'password') {
      setEditedPassword('**********');
    }
    setIsEditing(field);
  };

  const handleSave = (field) => {
    if (field === 'email') {
      // Aquí puedes enviar una solicitud para guardar el nuevo email.
      console.log('Guardar Email:', editedEmail);
    } else if (field === 'username') {
      // Aquí puedes enviar una solicitud para guardar el nuevo usuario.
      console.log('Guardar Usuario:', editedUsername);
    } else if (field === 'password') {
      // Aquí puedes enviar una solicitud para guardar la nueva contraseña.
      console.log('Guardar Contraseña:', editedPassword);
    }
    setIsEditing(false);
  };

  const handleInputChange = (event, field) => {
    if (field === 'email') {
      setEditedEmail(event.target.value);
    } else if (field === 'username') {
      setEditedUsername(event.target.value);
    } else if (field === 'password') {
      setEditedPassword(event.target.value);
    }
  };

  const confirmIcon = <CheckRoundedIcon style={{ color: 'green', cursor: 'pointer', fontSize: '0.938rem' }} />;
  const cancelIcon = <CloseRoundedIcon style={{ color: 'red', cursor: 'pointer', fontSize: '0.938rem' }}/>;

  return (
    <MDBCard className="card-user" alignment='left' border='none' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <MDBCardHeader className="card-header">
        Mis Datos
      </MDBCardHeader>

      <Table hover className="card-table">
        <tbody>
          <tr>
            <th scope='col'>Email:</th>
            {isEditing === 'email' ? (
              <td scope='col'>
                <input value={editedEmail} onChange={(e) => handleInputChange(e, 'email')} />
              </td>
            ) : (
              <td scope='col'>{props.email}</td>
            )}
            <td scope='col'>
              {isEditing === 'email' ? (
                <div>
                  {confirmIcon} {cancelIcon}
                </div>
              ) : (
                <EditRoundedIcon onClick={() => handleEdit('email')} style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} />
              )}
            </td>
          </tr>

          <tr>
            <th scope='col'>Usuario:</th>
            {isEditing === 'username' ? (
              <td scope='col'>
                <input value={editedUsername} onChange={(e) => handleInputChange(e, 'username')} />
              </td>
            ) : (
              <td scope='col'>{props.username}</td>
            )}
            <td scope='col'>
              {isEditing === 'username' ? (
                <div>
                  {confirmIcon} {cancelIcon}
                </div>
              ) : (
                <EditRoundedIcon onClick={() => handleEdit('username')} style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} />
              )}
            </td>
          </tr>

          <tr>
            <th scope='col'>Contraseña:</th>
            {isEditing === 'password' ? (
              <td scope='col'>
                <input type="password" value={editedPassword} onChange={(e) => handleInputChange(e, 'password')} />
              </td>
            ) : (
              <td scope='col'>**********</td>
            )}
            <td scope='col'>
              {isEditing === 'password' ? (
                <div>
                  {confirmIcon} {cancelIcon}
                </div>
              ) : (
                <EditRoundedIcon onClick={() => handleEdit('password')} style={{ color: '#2E5266', cursor: 'pointer', fontSize: '0.938rem' }} />
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </MDBCard>
  );
}
