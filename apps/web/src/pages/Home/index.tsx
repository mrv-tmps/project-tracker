import { Button, Container, Group, Paper, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthProvider';

import { logout } from '../../utils/Firebase';

function Home() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();

  if (!userDetails) {
    navigate('/login');
  }

  const handleLogout = async () => {
    await logout();
    showNotification({
      color: 'red',
      message: 'See you next time!',
      title: 'Signed Out',
    });
  };

  return (
    <Paper>
      <Group>
        <Container color="black">
          <Group position="center">
            <Stack>
              <Text size="lg">Projects</Text>
              <Text size="sm">You have no projects yet. Create one now!</Text>
              <Button>
                Create new project
              </Button>
            </Stack>
          </Group>
        </Container>
        <Button onClick={handleLogout}>Logout</Button>
      </Group>
    </Paper>
  );
}

export default Home;
