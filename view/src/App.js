import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Rooms from './pages/Rooms';
// import SearchPage from './pages/SearchPage';
import './App.css';


function App() {
  return (
    <div className="app">
      <Header />
      <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/rooms" element={<Rooms />} />
  {/*          <Route exact path= "/register" element={<Register/>}/>
              <Route exact path= "/login" element={<Login/>}/>
              <Route exact path= "/logout" element={<Logout/>}/>
              <Route exact path= "*" element={<Error/>}/>*/}
          </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

