import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import './Table.css'

export default function ListGroupExample() {
  return (
    <table className='table'>
  <tr>
    <td className='td'>Mail:</td>
    <td className='td'>franco.moralesdemaria@gmail.com</td>
    <td className='td'><CreateIcon style={{background: 'none', fontSize: '30px'}}></CreateIcon></td>
  </tr>
  <tr>
    <td className='td'>Usuario</td>
    <td className='td'>FrancoMorales</td>
    <td className='td'><CreateIcon style={{background: 'none', fontSize: '30px'}}></CreateIcon></td>
  </tr>
  <tr>
    <td className='td'>Contraseña</td>
    <td className='td'>**********</td>
    <td className='td'><CreateIcon style={{background: 'none', fontSize: '30px'}}></CreateIcon></td>
  </tr>
</table>
  );
}

