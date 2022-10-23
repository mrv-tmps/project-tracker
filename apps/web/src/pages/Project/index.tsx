import { Button, Group, Stack, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';
import { fetchProject } from 'services/ProjectService';

import { Project } from 'types/Project';

import * as S from '../styles';

function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserProject() {
      setLoading(true);

      const currentProject = params['projectId'] && await fetchProject(params['projectId']);

      if (currentProject) {
        setProject(currentProject);
      }

      setLoading(false);
    }

    if (params['projectId']) {
      getUserProject();
    }
  }, [params, project]);

  function handleBack() {
    navigate('/');
  }

  const renderLoading = loading && <CustomLoader />;

  const renderTaskText =
  <Text size={20} weight={400}>
    {project?.tasks
      ? `You currently have ${project?.tasks.length} task/s in this project.`
      : 'You have no tasks yet. Create one now!'
    }
  </Text>;

  const renderTaskList = project?.tasks.map((task)=>
    <Button
      key={task?.id}
      fullWidth
      color="dark"
      size={'md'}
      variant="outline"
    >
      <Text size={'sm'}>{`${task?.name}`}</Text>
    </Button>
  );

  return (
    <S.PageContainer>
      {renderLoading}
      <Group position="right">
        <Button color="gray" m={10} onClick={handleBack}>Back</Button>
      </Group>
      <Group align="stretch" my={80} position="center">
        <Stack align="stretch">
          <Text size={36} weight={800}>{project?.name}</Text>
          {renderTaskText}
          <S.Column>
            {renderTaskList}
            <Button fullWidth size={'md'}>
                Create new task
            </Button>
          </S.Column>
        </Stack>
      </Group>
    </S.PageContainer>
  );
}

export default ProjectPage;
