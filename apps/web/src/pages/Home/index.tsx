import { Button, Container, Group, Paper, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomLoader from '../../components/CustomLoader';

import { useAuth } from '../../contexts/AuthProvider';
import { fetchUserProjects } from '../../services/ProjectService';
import { Project } from '../../types/Project';
import { logout } from '../../utils/Firebase';

function Home() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState<Project[]>();
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    async function getUserProjects() {
      setLoading(true);
      const currentUserProjects = await fetchUserProjects(userDetails?.uid ?? '');

      if (currentUserProjects && currentUserProjects.length > 0) {
        setUserProjects(currentUserProjects);
      }
      setLoading(false);
    }

    if (userDetails) {
      getUserProjects();
    }
  }, [userDetails, userProjects]);

  const renderProjectText = userProjects ?
    <Text size="sm">You currently have {userProjects.length} projects.</Text> :
    <Text size="sm">You have no projects yet. Create one now!</Text>;

  const renderLoading = loading && <CustomLoader />;

  return (
    <Paper>
      {renderLoading}
      <Group>
        <Container color="black">
          <Group position="center">
            <Stack>
              <Text size="lg">Projects</Text>
              {renderProjectText}
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
