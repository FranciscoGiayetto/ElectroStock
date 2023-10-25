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
import Register from './pages/LoginNuevo/register';
import Private from './pages/LoginNuevo/private';
import MyComponent from './pages/Prestamos/Prestamos';
import { Link } from "react-router-dom";
import Informes from "./pages/Informes/Informes";
import DetallePrestamo from "./pages/DetallePrestamo/DetallePrestamo";

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
              <Route path="/private" element={<PrivateRoute><Private /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/*" element={<LayoutWrapper onSearch={handleSearch} searchQuery={searchQuery}/>} />
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
                          <Route path="/informe/" element={<PrivateRoute>
                              <Informes />
                          </PrivateRoute>} />  
      <Route path="/detalleCuenta" element={<PrivateRoute>
        <DetalleCuenta />
     </PrivateRoute>} />
      </Routes>
    </Layout>
  );
}

export default App;
