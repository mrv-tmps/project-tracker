import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { IconCheck, IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomModal from 'components/CustomModal';

import CustomLoader from '../../components/CustomLoader';

import { useAuth } from '../../contexts/AuthProvider';
import Status from '../../enums/Status';
import { createNewProject, fetchUserProjects } from '../../services/ProjectService';
import { Project } from '../../types/Project';
import { logout } from '../../utils/Firebase';

import * as S from '../styles';

function Home() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState<Project[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState(false);

  if (!userDetails) {
    navigate('/login');
  }

  useEffect(() => {
    async function getUserProjects() {
      setLoading(true);
      const currentUserProjects = await fetchUserProjects(userDetails?.uid ?? '');

      if (currentUserProjects) {
        console.log(currentUserProjects);
      }
      setLoading(false);
    }

    if (userDetails) {
      getUserProjects();
    }
  }, [userDetails, userProjects]);

  function handleNavigateToProject(id: string) {
    navigate(`/project/${id}`);
  }

  async function handleLogout() {
    await logout();
    showNotification({
      color: 'red',
      message: 'See you next time!',
      title: 'Signed Out',
    });
  }

  const toggleModalDisplay = () => {
    setIsOpened(!isOpened);
  };

  const renderLoading = loading && <CustomLoader />;

  const renderProjectText =
    <Text align="center" size={20} weight={400}>
      {userProjects
        ? `You currently have ${userProjects.length} projects.`
        : 'You have no projects yet. Create one now!'
      }
    </Text>;

  const renderProjectList = userProjects?.map(({
    id,
    name,
    type,
  }) => (
    <Button
      key={id}
      color={type === Status.ACTIVE ? 'dark' : 'gray'}
      disabled={type === Status.INACTIVE}
      size={'md'}
      variant="outline"
      onClick={() => handleNavigateToProject(id)}
    >
      <Text size={'sm'}>{`${name}`}</Text>
    </Button>
  ));

  const formReturnType = useForm({
    initialValues: {
      id: userDetails?.uid ?? '',
      name: '',
    },

    validate: {
      name: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
    },
  });

  const handleSaveProject = async () => {
    try {
      const project = await createNewProject(formReturnType.values.name, formReturnType.values.id);

      if (project) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully created a new project.',
          title: 'Success',
        });

        formReturnType.reset();
        toggleModalDisplay();
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'You have failed to create a new project.',
        title: 'Error',
      });
    }
  };

  const renderModal = (
    <CustomModal
      centered
      opened={isOpened}
      overlayBlur={3}
      overlayColor={'gray'}
      overlayOpacity={0.55}
      title={'Create New Project'}
      onClose={toggleModalDisplay}
    >
      <form onSubmit={formReturnType.onSubmit(handleSaveProject)}>
        <TextInput
          required
          error={formReturnType.errors['name'] && 'Invalid name'}
          label="Name"
          mb={5}
          placeholder="My Project"
          value={formReturnType.values['name']}
          onChange={(event) => formReturnType.setFieldValue('name', event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" type="submit">
          {'Create'}
        </Button>
      </form>
    </CustomModal>
  );

  return (
    <S.PageContainer>
      {renderModal}
      {renderLoading}
      <Group position="right">
        <Button color="red" m={10} onClick={handleLogout}>Logout</Button>
      </Group>
      <Group align="stretch" my={80} position="center">
        <Stack align="stretch">
          <Text align="center" size={36} weight={800}>Projects</Text>
          {renderProjectText}
          <S.Column>
            {renderProjectList}
            <Button size={'md'} onClick={toggleModalDisplay}>
              Create new project
            </Button>
          </S.Column>
        </Stack>
      </Group>
    </S.PageContainer>
  );
}

export default Home;
