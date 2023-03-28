import { Button, Image, Group, Paper, SimpleGrid, Stack, Text, Title, Grid } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';

import TaskStatus from 'enums/TaskStatus';
import { fetchAllTasks } from 'services/TaskService';
import { Task } from 'types/Task';

import * as S from '../styles';

function TaskPage() {
  const params = useParams();
  const [fetchedTasks, setFetchedTasks] = useState<Task[] | void>();
  const [task, setTask] = useState<Task | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedTasks && params['taskId']) {
      getCurrentTask(fetchedTasks, params['taskId']);
    }

    if (!task) {
      getAllTasks();
    }
  }, [fetchedTasks, params]);

  function getCurrentTask(fetchedTasks: Task[], id: string) {
    setTask(fetchedTasks.find((task) => (task.id === id)));
  }

  async function getAllTasks() {
    setLoading(true);

    const currentTask = await fetchAllTasks();

    if (currentTask) {
      setFetchedTasks(currentTask.data);
    }

    setLoading(false);
  }

  function handleBack() {
    navigate(-1);
  }

  const renderLoading = loading && <CustomLoader />;

  const renderImages = <Paper withBorder>
    <Image
      withPlaceholder
      alt="With custom placeholder"
      height={120}
    />
  </Paper>;

  const renderToDo = <Paper withBorder px={25}>
    <p>Setup migrations</p>
  </Paper>;

  return (
    <S.PageContainer>
      <Paper m="lg">
        {renderLoading}
        <Group position="right">
          <Button color="gray" onClick={handleBack}>Back</Button>
        </Group>
        <Grid>
          <Grid.Col md={8}>
            <Stack align="stretch">
              <Text size={36} weight={800}>{task?.name}</Text>
              <Group position="apart">
                <Title size={24} weight={500}>Description</Title>
                <Button>Upload Image</Button>
              </Group>
              <Paper withBorder px={25}>
                <p>{task?.description ?? 'Not Available'}</p>
              </Paper>
              <SimpleGrid
                breakpoints={[
                  { cols: 1, maxWidth: 'xs' },
                  { cols: 2, maxWidth: 'sm' },
                  { cols: 3, maxWidth: 'md' },
                ]}
                cols={3}>
                {renderImages}
                {renderImages}
                {renderImages}
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col md={4}>
            <Stack>
              <Title mt={15} size={24} weight={500}>Status</Title>
              <Paper withBorder mt={5} pl={25} pr={10}>
                <Group position="apart">
                  <p>{task?.status ?? TaskStatus.IN_PROGRESS}</p>
                  <Button size="sm" variant="white">
                    <IconArrowRight
                      color={'#228BE6'}
                      size={24}
                      strokeWidth={2}
                    />
                  </Button>
                </Group>
              </Paper>
              <Title size={24} weight={500}>Assigned</Title>
              <S.AssignedContainer>
                <p>{task?.assignee_id}</p>
              </S.AssignedContainer>
            </Stack>
          </Grid.Col>
          <Grid.Col md={8}>
            <Stack>
              <Group position="apart">
                <Title size={24} weight={500}>To Dos</Title>
                <Button>Add</Button>
              </Group>
              {renderToDo}
              <Group position="apart">
                <Title size={24} weight={500}>Comments</Title>
                <Button>Add new comment</Button>
              </Group>
              <Paper withBorder mb="md" px={25} py={15}>
                <Group position="apart">
                  <Text>All details are subject to change</Text>
                  <Text color="blue">{task?.assignee_id}</Text>
                </Group>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </S.PageContainer>
  );
}

export default TaskPage;
