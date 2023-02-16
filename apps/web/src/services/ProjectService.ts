import { showNotification } from '@mantine/notifications';

import { projects } from '../constants/PseudoData';

export async function createNewProject(name: string, userId: string) {
  try {
    const data = userId && projects;

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
    const data = userId && projects;

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
