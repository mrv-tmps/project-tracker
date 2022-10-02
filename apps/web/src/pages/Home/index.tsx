import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../utils/Firebase';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showNotification({
      color: 'red',
      message: 'See you next time!',
      title: 'Signed Out',
    });
    navigate('/login');
  };

  return (
    <div>
      <h1>You are currently logged in.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
