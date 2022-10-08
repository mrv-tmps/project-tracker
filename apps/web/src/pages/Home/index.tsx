import { Button, Container, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomLoader from '../../components/CustomLoader';

import { useAuth } from '../../contexts/AuthProvider';
import Status from '../../enums/Status';
import { fetchUserProjects } from '../../services/ProjectService';
import { Project } from '../../types/Project';
import { logout } from '../../utils/Firebase';

import * as S from './styles';

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

  const renderLoading = loading && <CustomLoader />;

  const renderProjectText =
    <Text align="center" size={24} weight={400}>
      {userProjects
        ? `You currently have ${userProjects.length} projects.`
        : 'You have no projects yet. Create one now!'
      }
    </Text>;

  const renderProjectList = userProjects?.map(({
    id,
    name,
    type,
  }) =>(
    <Button key={id} color={type === Status.ACTIVE? 'indigo' : 'gray'} size={'md'}>
      <Text size={'sm'}>{`${name}`}</Text>
    </Button>
  ));

  return (
    <S.ProjectsPage>
      {renderLoading}
      <Group position="right">
        <Button mt={20} onClick={handleLogout}>Logout</Button>
      </Group>
      <Group my={80} position="center">
        <Stack>
          <Text align="center" size={42} weight={800}>Projects</Text>
          {renderProjectText}
          <S.Column>
            {renderProjectList}
            <Button size={'md'}>
                Create new project
            </Button>
          </S.Column>
        </Stack>
      </Group>
    </S.ProjectsPage>
  );
}

export default Home;
