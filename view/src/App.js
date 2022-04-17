import React from 'react';
import ReactDOM from 'react-dom/server';
import { Container } from 'react-bootstrap';
import { Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppNavbar from './components/AppNavbar';

function App() {

  return (
    <>
      <AppNavbar />
      <Container>
        <Routes>

          <Route exact path="/" element={<Home />} />

        </Routes>
      </Container>
    </>
  );
}

export default App;
