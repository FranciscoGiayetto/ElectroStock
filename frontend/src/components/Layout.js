import React from 'react';
import App from './Sidebar/Sidebar';


function Layout(props) {
  return (
    <div className="container">
      <App />
      {props.children}
    </div>
  );
}

export default Layout;
