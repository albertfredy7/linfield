
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Insights from './Pages/Insights';
import Home from './Pages/Home';
import Login from './Pages/Login'; // Make sure to import the Login component

function App() {
 const location = useLocation();
 const isLoginRoute = location.pathname === '/login';
 return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
 );
}

export default App;