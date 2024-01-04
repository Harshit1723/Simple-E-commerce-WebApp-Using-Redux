import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home';
import LoginForm from './component/Loginform';
import Cart from './component/Cart';
import Navigation from './component/Navigation';


const App = () => {
  const [token, setToken] = useState(null);
  
  useEffect( () => {
    const storedToken = localStorage.getItem('token');
    const shouldRemeber = localStorage.getItem('rememberMe') === 'true';
  
    if(storedToken && shouldRemeber){
      setToken(storedToken);
    }
  },[]);

 

  const handleLogin = (userToken) => {
    setToken(userToken);

  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    setToken(null);
    console.log('Logout successful.');
  };

  

  return (
    <BrowserRouter>

   
  
 
   <Navigation token={token}  />
     
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={token ? <Home onLogout={handleLogout}  /> : <Navigate to="/login" />}
        />
        <Route path="/cart" element={<Cart token={token} onBack={() => window.history.back()} />} />



      </Routes>

     

    </BrowserRouter>
  );
};

export default App;
