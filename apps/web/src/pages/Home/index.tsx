import { Notification } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../utils/Firebase';

function Home() {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  const renderAlert = isLoggedOut && <Notification title="Logged Out">
    'See you next time!'
  </Notification>;

  const handleLogout = async () => {
    await logout();
    setIsLoggedOut(true);
    navigate('/login');
  };

  return (
    <div>
      {renderAlert}
      <h1>You are currently logged in.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
