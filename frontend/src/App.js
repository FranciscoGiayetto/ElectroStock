import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetalleProducto from "./pages/DetalleProducto";
import Layout from "./components/Layout";
import * as React from 'react';
import Ecommerce from "./pages/Ecommerce/Ecommerce.jsx";
import  './assets/styles/App.css';
function App() {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<LayoutWrapper />} />
          </Routes>
        </div>
      </div>
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
