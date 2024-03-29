import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';

import { CreateTaskDto } from './../../../api/src/app/task/dto/create-task.dto';

const taskApi = ApiClient.use(DefaultApi);

export async function createNewTask(createTaskDto: CreateTaskDto) {
  try {
    const data = await taskApi.taskControllerCreateNewTask(createTaskDto);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while creating the task. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}

export async function fetchTasks(projectId: string) {
  try {
    const data = await taskApi.taskControllerGetTasksByProjectId(projectId);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting the project tasks. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}

export async function fetchAllTasks() {
  try {
    const data = await taskApi.taskControllerGetAllTasks();

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting all tasks. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}
