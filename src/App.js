/* Tiktok BryanMQL */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Bienvenido from './pages/Bienvenido';
import Carta from './pages/Carta';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Bienvenido />} />
      <Route path="/carta/:id" element={<Carta />} />
    </Routes>
  );
}

export default App;
/* Tiktok BryanMQL */