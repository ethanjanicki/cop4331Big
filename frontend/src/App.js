import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage.js';
import RegPage from './pages/RegPage.js';
import CardPage from './pages/CardPage.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/register" index element={<RegPage />} />
      <Route path="/cards" index element={<CardPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;