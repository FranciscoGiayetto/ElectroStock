import {
  BrowserRouter as Router,
  Routes,
   Route
}from "react-router-dom";
//import './assets/styles/App.css'
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      


    <div className="container">
      <div className="app">
       
        <Routes>
        <Route path="/login" element={<LoginPage/>} />

        </Routes>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
