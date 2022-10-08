import { AppShell } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import Role from '../enums/Role';
import ErrorPage from '../pages/Error';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

export function App() {
  return (
    <AppShell fixed padding="md">
      <BrowserRouter>
        <Routes>
          <Route element={
            <ProtectedRoute roles={[Role.PROJECT_MANAGER, Role.DEV]}>
              <Home />
            </ProtectedRoute>
          } path="/" />
          <Route element={<Registration />} path="/registration" />
          <Route element={<Login />} path="/login" />
          <Route element={<ErrorPage />} path="/*" />
        </Routes>
      </BrowserRouter>
    </AppShell>
  );
}

export default App;
