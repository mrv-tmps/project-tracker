import { showNotification } from '@mantine/notifications';

import { projects } from '../constants/PseudoData';

export async function fetchUserProjects(id : string) {
  try {
    const data = id && projects;

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
