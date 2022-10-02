import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Registration />} path="/registration" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
