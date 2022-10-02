import { AppShell } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

export function App() {
  return (
    <AppShell fixed padding="md">
      <BrowserRouter>
        <Routes>

          <Route element={<Home />} path="/" />
          <Route element={<Registration />} path="/registration" />
          <Route element={<Login />} path="/login" />

        </Routes>
      </BrowserRouter>
    </AppShell>
  );
}

export default App;
