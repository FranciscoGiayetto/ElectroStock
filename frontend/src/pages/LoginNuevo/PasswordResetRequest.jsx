// PasswordResetRequest.js

import React, { useState } from 'react';
import { requestPasswordReset } from '../../utils/auth';

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = async () => {
    const { data, error } = await requestPasswordReset(email);
    if (data) {
      setMessage(data.message);
    } else {
      setMessage(error);
    }
  };

  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu dirección de correo electrónico para recibir instrucciones de recuperación.</p>

      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button onClick={handleResetRequest}>Enviar Correo de Recuperación</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordResetRequest;
