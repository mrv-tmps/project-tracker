import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';
import { fetchTask } from 'services/TaskService';

import { Task } from 'types/Task';

import * as S from '../styles';

function TaskPage() {
  const params = useParams();
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProjectTask() {
      setLoading(true);

      const currentTask = params['taskId'] && await fetchTask(params['taskId']);

      if (currentTask) {
        setTask(currentTask);
      }

      setLoading(false);
    }

    if (params['taskId']) {
      getProjectTask();
    }
  }, [params, task]);

  function handleBack() {
    navigate('/');
  }

  const renderLoading = loading && <CustomLoader />;

  return (
    <S.PageContainer>
      {renderLoading}
      <Group position="right">
        <Button color="gray" m={10} onClick={handleBack}>Back</Button>
      </Group>
      <Group align="stretch" m={80} position="left">
        <Stack align="stretch">
          <Text size={36} weight={800}>{task?.name}</Text>
          <Group position="apart">
            <Text>Description</Text>
            <Button>Upload Image</Button>
          </Group>
          <Paper>
            {task?.description}
          </Paper>
        </Stack>
      </Group>
    </S.PageContainer>
  );
}

export default TaskPage;
