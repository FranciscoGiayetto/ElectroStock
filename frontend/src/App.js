import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import HomePage from "./pages/Home/HomePage";
import DetalleCuenta from "./pages/DetalleCuenta/DetalleCuenta";
import DetalleProducto from "./pages/DetalleProducto/DetalleProducto";
import Layout from "./BaseLayout/Layout";
import * as React from 'react';
import Ecommerce from "./pages/Ecommerce/Ecommerce.jsx";
import Carrito from './pages/Carrito/Carrito.jsx';
import  './assets/styles/App.css';
import Home from './pages/LoginNuevo/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './pages/LoginNuevo/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './pages/LoginNuevo/logout';
import Private from './pages/LoginNuevo/private';
import MyComponent from './pages/Prestamos/Prestamos';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(query);
  };
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

function LayoutWrapper({ onSearch, searchQuery }) {
  return (
    <Layout>
      <Routes>
      
      <Route path="/" element={<PrivateRoute>
                              <HomePage />
                          </PrivateRoute>} />
        <Route path= "/tienda" element={<PrivateRoute>
                              <Ecommerce />
                          </PrivateRoute>}/>
        <Route path= "/carrito" element={<PrivateRoute>
                              <Carrito />
                          </PrivateRoute>}/>
        <Route path="/detalleProducto/:id" element={<PrivateRoute>
                              <DetalleProducto />
                          </PrivateRoute>} />
      <Route path="/detalleCuenta" element={<PrivateRoute>
        <DetalleCuenta />
     </PrivateRoute>} />
     <Route path="/Prestamos" element={<PrivateRoute>
        <MyComponent />
     </PrivateRoute>} />
      </Routes>
    </Layout>
  );
}

export default App;
