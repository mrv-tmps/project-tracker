import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';
import { projects } from '../constants/PseudoData';

const projectApi = ApiClient.use(DefaultApi);

export async function createNewProject(name: string, userId: string) {
  try {
    const data = await projectApi.userControllerGetById(userId);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting the user projects. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}

export async function fetchUserProjects(userId: string) {
  try {
    const data = await projectApi.userControllerGetById(userId);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting the user projects. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}

export async function fetchProject(projectId: string) {
  try {
    const data = projects.find((project) => project.id === projectId);

    return data;
  } catch (error) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while getting the user projects. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}
