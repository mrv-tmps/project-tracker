import { Button, Image, Group, Paper, SimpleGrid, Stack, Text, Title, Grid } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons';
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
      <Grid gutter="xl" mx={50} my={30}>
        <Grid.Col span={8}>
          <Stack align="stretch">
            <Text size={36} weight={800}>{task?.name}</Text>
            <Group position="apart">
              <Title size={24} weight={500}>Description</Title>
              <Button>Upload Image</Button>
            </Group>
            <Paper withBorder px={25}>
              <p>{task?.description}</p>
            </Paper>
            <SimpleGrid cols={3}>
              <Paper withBorder>
                <Image
                  withPlaceholder
                  alt="With custom placeholder"
                  height={120}
                />
              </Paper>
              <Paper withBorder>
                <Image
                  withPlaceholder
                  alt="With custom placeholder"
                  height={120}
                />
              </Paper>
              <Paper withBorder>
                <Image
                  withPlaceholder
                  alt="With custom placeholder"
                  height={120}
                />
              </Paper>
            </SimpleGrid>
            <Group position="apart">
              <Title size={24} weight={500}>To Dos</Title>
              <Button>Create new task</Button>
            </Group>
            <Paper withBorder px={25}>
              <p>Setup migrations</p>
            </Paper>
            <Paper withBorder px={25}>
              <p>Deploy backend</p>
            </Paper>
            <Group position="apart">
              <Title size={24} weight={500}>Comments</Title>
              <Button>Add new comment</Button>
            </Group>
            <Paper withBorder px={25} py={15}>
              <Group position="apart">
                <Text>All details are subject to change</Text>
                <Text color="blue">Merv Tampus</Text>
              </Group>
            </Paper>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <Title mt={70} size={24} weight={500}>Status</Title>
            <Paper withBorder mt={5} pl={25} pr={10}>
              <Group position="apart">
                <p>{task?.status}</p>
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
              <p>Merv Tampus</p>
            </S.AssignedContainer>
          </Stack>
        </Grid.Col>
      </Grid>
    </S.PageContainer>
  );
}

export default TaskPage;
