import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider'

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert('See you next time!');
    navigate('/login');
  }

  return (
    <div>
      <h1>You are currently logged in.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home