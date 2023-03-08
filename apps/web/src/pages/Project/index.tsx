import { Button, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomLoader from 'components/CustomLoader';
import CustomModal from 'components/CustomModal';
import { useAuth } from 'contexts/AuthProvider';
import { DateFormatEnums } from 'enums/DateFormat';
import TaskStatus from 'enums/TaskStatus';

import { fetchProject } from 'services/ProjectService';
import { createNewTask } from 'services/TaskService';

import { Project } from 'types/Project';
import { formatDate } from 'utils/Date';

import * as S from '../styles';

function ProjectPage() {
  const params = useParams();
  const { userDetails } = useAuth();
  const [project, setProjectData] = useState<Project[] | void>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (params['projectId']) {
      getProject(params['projectId']);
    }
  }, [params]);

  async function getProject(id: string) {
    setLoading(true);

    const currentTasks = await fetchProject(id);

    if (currentTasks) {
      setProjectData(currentTasks.data);
    }
  }

  useEffect(() => {
    if (project) {
      setLoading(false);
    }
  }, [project]);

  function handleBack() {
    navigate('/');
  }

  function handleNavigateToTask(taskId: string) {
    navigate(`/task/${taskId}`);
  }

  function getDueDate(dueDate: string | Date | undefined) {
    const newDate = dueDate ? new Date(dueDate) : '';

    return <Text size={'sm'}>{newDate ? formatDate(newDate, DateFormatEnums.MONTH_DAY_YEAR) : ''}</Text>;
  }

  const formReturnType = useForm({
    initialValues: {
      assigneeId: '',
      description: '',
      dueDate: '',
      id: userDetails?.uid ?? '',
      name: '',
      projectId: params['projectId'],
      status: '',
    },

    validate: {
      assigneeId: (val) => (val.length < 1 ? 'Assignee should include at least contain 1 character' : null),
      dueDate: (val) => (val.length < 1 ? 'Please pick a date' : null),
      name: (val) => (val.length < 1 ? 'Name should include at least contain 1 character' : null),
      status: (val) => (val.length < 1 ? 'Please indicate a status' : null),
    },
  });

  const toggleModalDisplay = () => {
    setIsOpened(!isOpened);
  };

  const handleSaveTask = async () => {
    setLoading(true);

    try {
      const task = await createNewTask({
        assignee_id: formReturnType.values.assigneeId,
        created_by: formReturnType.values.id,
        description: formReturnType.values.description,
        due_date: formReturnType.values.dueDate,
        name: formReturnType.values.name,
        project_id: formReturnType.values.projectId ?? '',
        status: formReturnType.values.status,
      });

      if (task && params['projectId']) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully created a new task.',
          title: 'Success',
        });

        getProject(params['projectId']);
        formReturnType.reset();
        toggleModalDisplay();
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'You have failed to create a new task.',
        title: 'Error',
      });
    }

    setLoading(false);
  };

  const renderLoading = loading && <CustomLoader />;

  const renderTaskText = <Text size={20} weight={400}>
    {project?.at(0)?.task
      ? `You currently have ${project?.at(0)?.task.length} task/s in this project.`
      : 'You have no tasks yet. Create one now!'
    }
  </Text>;

  const renderTaskList = project?.at(0)?.task?.map((projectTask) =>
    <Button
      key={projectTask?.id}
      fullWidth
      color="dark"
      size={'lg'}
      variant="outline"
      onClick={() => handleNavigateToTask(projectTask?.id)}
    >
      <S.TaskButtonTextWrapper>
        <Group position="left">
          <Text size={'sm'}>{projectTask?.name}</Text>
        </Group>
        <Group position="right" spacing={105}>
          <Text size={'sm'}>{projectTask?.assignee_id}</Text>
          {getDueDate(projectTask?.due_date)}
          <Text size={'sm'}>{projectTask?.status}</Text>
        </Group>
      </S.TaskButtonTextWrapper>
    </Button>
  );

  const createNewTaskForm = <Button size={'md'} onClick={toggleModalDisplay}>
    Add new ticket
  </Button>;

  const renderModal = (
    <CustomModal
      centered
      opened={isOpened}
      overlayBlur={3}
      overlayColor={'gray'}
      overlayOpacity={0.55}
      title={'Create New Task'}
      onClose={toggleModalDisplay}
    >
      <form onSubmit={formReturnType.onSubmit(handleSaveTask)}>
        <TextInput
          required
          error={formReturnType.errors['name'] && 'Invalid name'}
          label="Name"
          mb={5}
          placeholder="Task 1"
          value={formReturnType.values['name']}
          onChange={(event) => formReturnType.setFieldValue('name', event.currentTarget.value)}
        />
        <TextInput
          required
          error={formReturnType.errors['assigneeId'] && 'Invalid Assignee'}
          label="Assignee"
          mb={5}
          placeholder="Member 1"
          value={formReturnType.values['assigneeId']}
          onChange={(event) => formReturnType.setFieldValue('assigneeId', event.currentTarget.value)}
        />
        <Select
          required
          data={[TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]}
          error={formReturnType.errors['status'] && 'Invalid Status'}
          label="Status"
          placeholder="Current Status"
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={30}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          value={formReturnType.values['status']}
          onChange={(value) => value && formReturnType.setFieldValue('status', value)}
        />
        <input
          required
          type="date"
          value={formReturnType.values['dueDate'].toString()}
          onChange={(event) => formReturnType.setFieldValue('dueDate', event.currentTarget.value)}
        />
        <TextInput
          error={formReturnType.errors['description'] && 'Invalid Description'}
          label="Description"
          mb={5}
          placeholder="Create an interface"
          value={formReturnType.values['description']}
          onChange={(event) => formReturnType.setFieldValue('description', event.currentTarget.value)}
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
        <Button color="gray" m={10} onClick={handleBack}>Back</Button>
      </Group>
      <Group align="stretch" my={80} position="center">
        <Stack align="stretch">
          <Text size={36} weight={800}>{project?.at(0)?.name}</Text>
          {renderTaskText}
          <S.TaskColumn>
            {renderTaskList}
            <Group position="right">
              {createNewTaskForm}
            </Group>
          </S.TaskColumn>
        </Stack>
      </Group>
    </S.PageContainer>
  );
}

export default ProjectPage;
