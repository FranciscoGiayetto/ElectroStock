import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import DetalleProducto from "./pages/DetalleProducto/DetalleProducto";
import Layout from "./BaseLayout/Layout";
import * as React from 'react';
import Ecommerce from "./pages/Ecommerce/Ecommerce.jsx";
import  './assets/styles/App.css';
import Home from './pages/LoginNuevo/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './pages/LoginNuevo/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './pages/LoginNuevo/logout';
import Private from './pages/LoginNuevo/private';


function App() {
  return (
    <Router>
      <MainWrapper>
      <div className="container">
        <div className="app">
          <Routes>
          <Route
                      path="/private"
                      element={
                          <PrivateRoute>
                              <Private />
                          </PrivateRoute>
                      }
                  />
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
        
                  <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<LayoutWrapper />} />
          </Routes>
        </div>
      </div>
      </MainWrapper>
    </Router>
    
  );
}

function LayoutWrapper() {
  return (
    <Layout>
      <Routes>
      
      <Route path="/" element={<HomePage />} />
        <Route path= "/tienda" element={<Ecommerce/>}/>
        <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
      </Routes>
    </Layout>
  );
}




export default App;
