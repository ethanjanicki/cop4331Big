import React from 'react';
import "./styles.css";
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage.js';
import RegPage from './pages/RegPage';
import ProfilePage from './pages/ProfilePage';
import ListPage from './pages/ListPage';
import MapPage from './pages/MapPage';
import VerifyPage from './pages/VerifyPage';
import ResetPage from './pages/ResetPage';
import ResetSentPage from './pages/ResetSentPage';
//import CardPage from './pages/CardPage.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/register" index element={<RegPage />} />
      <Route path="/profile" index element={<ProfilePage />} />
      <Route path="/list" index element={<ListPage />} />
      <Route path="/map" index element={<MapPage />} />
      <Route path="/verify" index element={<VerifyPage />} />
      <Route path="/reset" index element={<ResetPage />} />
      <Route path="/resetsent" index element={<ResetSentPage />} />

    </Routes>
  </BrowserRouter>
);
}

export default App;