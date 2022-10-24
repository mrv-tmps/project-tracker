import { Role } from '@project-tracker/enums';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from 'components/ProtectedRoute';
import ErrorPage from 'pages/Error';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Project from 'pages/Project';
import Registration from 'pages/Registration';
import Task from 'pages/Task';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute roles={[Role.PROJECT_MANAGER, Role.DEV]}>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute roles={[Role.PROJECT_MANAGER, Role.DEV]}>
              <Project />
            </ProtectedRoute>
          }
          path="/project"
        >
          <Route element={<Project />} path=":projectId" />
        </Route>
        <Route element={
          <ProtectedRoute roles={[Role.PROJECT_MANAGER, Role.DEV]}>
            <Task />
          </ProtectedRoute>
        } path="/task">
          <Route element={<Task />} path=":taskId" />
        </Route>
        <Route element={<Registration />} path="/registration" />
        <Route element={<Login />} path="/login" />
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
