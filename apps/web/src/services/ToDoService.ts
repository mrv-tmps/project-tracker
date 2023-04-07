import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';

import { CreateToDoDto } from './../../../api/src/app/todo/dto/create-todo.dto';

const toDoApi = ApiClient.use(DefaultApi);

export async function createNewToDo(createToDoDto: CreateToDoDto) {
  try {
    const data = await toDoApi.toDoControllerCreate(createToDoDto);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while creating to do. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}

export async function fetchToDos(taskId: string) {
  try {
    const data = await toDoApi.toDoControllerGetToDoByTaskId(taskId);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting  to dos. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}
