import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
// import RoomView from './pages/RoomView';
// import SearchPage from './pages/SearchPage';
import { UserProvider } from './UserContext';

function App() {

  // Define user session state based on token
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  // Fetch JWT from sessionStorage and verify using endpoint
  useEffect(() => {

    const verifyUser = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return console.log('No token found');

      try {
        const response = await fetch('http://localhost:9000/users/verify', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) return console.log('Invalid token');

        const data = await response.json();
        setUser({ id: data.id, isAdmin: data.isAdmin });

      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();

  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/rooms" element={<Rooms />} />
            {/* <Route exact path="/rooms/:roomId" element={<RoomView />} /> */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            {/*  */}
            {/*         
              
              <Route exact path= "/logout" element={<Logout/>}/>
              <Route exact path= "*" element={<Error/>}/>*/}
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
