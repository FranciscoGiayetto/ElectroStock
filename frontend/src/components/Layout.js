import React from 'react';
import Sidebar from './Sidebar/Sidebar';

function Layout(props) {
  return (
    <div className="container">
      <Sidebar />
      {props.children}
    </div>
  );
}

export default Layout;
