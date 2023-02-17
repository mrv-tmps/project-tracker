import { Button, Group, Stack, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';
import { DateFormatEnums } from 'enums/DateFormat';
import { fetchProject } from 'services/ProjectService';

import { Project } from 'types/Project';

import { formatDate } from 'utils/Date';

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

  function handleNavigateToTask(taskId: string) {
    navigate(`/task/${taskId}`);
  }

  function getDueDate(dueDate: string | Date | undefined) {
    const newDate = dueDate ? new Date(dueDate) : new Date();

    return <Text size={'sm'}>{formatDate(newDate, DateFormatEnums.MONTH_DAY_YEAR)}</Text>;
  }

  const renderLoading = loading && <CustomLoader />;

  const renderTaskText =
    <Text size={20} weight={400}>
      {project?.tasks
        ? `You currently have ${project?.tasks.length} task/s in this project.`
        : 'You have no tasks yet. Create one now!'
      }
    </Text>;

  const renderTaskList = project?.tasks?.map((task) =>
    <Button
      key={task?.id}
      fullWidth
      color="dark"
      size={'lg'}
      variant="outline"
      onClick={() => handleNavigateToTask(task?.id)}
    >
      <S.TaskButtonTextWrapper>
        <Group position="left">
          <Text size={'sm'}>{task?.name}</Text>
        </Group>
        <Group position="right" spacing={105}>
          <Text size={'sm'}>{task?.assignee_user_id}</Text>
          {getDueDate(task?.due_date)}
          <Text size={'sm'}>{task?.status}</Text>
        </Group>
      </S.TaskButtonTextWrapper>
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
          <S.TaskColumn>
            {renderTaskList}
            <Group position="right">
              <Button size={'md'}>
                Add new ticket
              </Button>
            </Group>
          </S.TaskColumn>
        </Stack>
      </Group>
    </S.PageContainer>
  );
}

export default ProjectPage;
