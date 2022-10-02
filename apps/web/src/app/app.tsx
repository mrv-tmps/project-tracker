import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
