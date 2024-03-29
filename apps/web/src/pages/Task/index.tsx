import { Button, Image, Group, Paper, SimpleGrid, Stack, Text, Title, Grid, Select } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';

import TaskStatus from 'enums/TaskStatus';
import { fetchComments } from 'services/CommentService';
import { fetchAllTasks } from 'services/TaskService';
import { fetchToDos } from 'services/ToDoService';
import { Comment } from 'types/Comment';
import { Task } from 'types/Task';
import { ToDo } from 'types/ToDo';

import * as S from '../styles';

import CommentModal from './CommentModal';
import ToDoModal from './ToDoModal';

function TaskPage() {
  const params = useParams();
  const [fetchedTasks, setFetchedTasks] = useState<Task[] | void>();
  const [toDos, setToDos] = useState<ToDo[] | void>();
  const [comments, setComments] = useState<Comment[] | void>();
  const [task, setTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState(false);
  const [commentIsOpened, setCommentIsOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedTasks && params['taskId']) {
      getCurrentTask(fetchedTasks, params['taskId']);
      getToDos(params['taskId']);
      getComments(params['taskId']);
    }

    if (!task) {
      getAllTasks();
    }
  }, [fetchedTasks, params, isUpdated]);

  const toggleIsUpdated = () => {
    setIsUpdated(!isUpdated);
  };

  const toggleToDoModalDisplay = () => {
    setIsOpened(!isOpened);
  };

  const toggleCommentModalDisplay = () => {
    setCommentIsOpened(!commentIsOpened);
  };

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

  async function getToDos(id: string) {
    setLoading(true);

    const currentToDos = await fetchToDos(id);

    if (currentToDos) {
      setToDos(currentToDos.data);
    }

    setLoading(false);
  }

  async function getComments(id: string) {
    setLoading(true);

    const currentComments = await fetchComments(id);

    if (currentComments) {
      setComments(currentComments.data);
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

  const renderToDo = toDos && toDos.length > 0 ? toDos.map(({ id, description }) => (
    <Paper key={id} withBorder px={25}>
      <p>{description}</p>
    </Paper>
  )) : (
    <Paper withBorder px={25}>
      <p>No To Dos available</p>
    </Paper>
  );

  const renderComments = comments && comments.length > 0 ? comments.map(({ commenter_user_id, description, id }) => (
    <Paper key={id} withBorder px={25} py={15}>
      <Group position="apart">
        <Text>{description}</Text>
        <Text color="blue">{commenter_user_id}</Text>
      </Group>
    </Paper>
  )) : (
    <Paper withBorder px={25}>
      <p>No comments available</p>
    </Paper>
  );

  const renderToDoModal = task && (
    <ToDoModal
      isOpened={isOpened}
      taskId={task.id}
      onClose={toggleToDoModalDisplay}
      onUpdate={toggleIsUpdated}
    />
  );
  const renderCommentModal = task && (
    <CommentModal
      isOpened={commentIsOpened}
      taskId={task.id}
      onClose={toggleCommentModalDisplay}
      onUpdate={toggleIsUpdated}
    />
  );

  return (
    <S.PageContainer>
      <Paper m="lg">
        {renderToDoModal}
        {renderCommentModal}
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
              <Select
                data={[
                  { label: TaskStatus.TO_DO, value: TaskStatus.TO_DO },
                  { label: TaskStatus.IN_PROGRESS, value: TaskStatus.IN_PROGRESS },
                  { label: TaskStatus.DONE, value: TaskStatus.DONE },
                ]}
                placeholder={task?.status}
                size="lg"
                value={task?.status}
              />
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
                <Button onClick={toggleToDoModalDisplay}>Add</Button>
              </Group>
              {renderToDo}
            </Stack>
          </Grid.Col>
          <Grid.Col md={4}>
            <Stack>
              <Group position="apart">
                <Title size={24} weight={500}>Comments</Title>
                <Button onClick={toggleCommentModalDisplay}>Add comment</Button>
              </Group>
              {renderComments}
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </S.PageContainer>
  );
}

export default TaskPage;
