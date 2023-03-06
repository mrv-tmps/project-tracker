import { showNotification } from '@mantine/notifications';

import { tasks } from '../constants/PseudoData';

export async function fetchTask(taskId: string) {
  try {
    const data = tasks.find((task) => task.id === taskId);

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

/*
 * export async function fetchTasks(projectId: string) {
 *   try {
 *     const data = await taskApi.taskControllerGetTasksByProjectId(projectId);
 */

/*
 *     return data;
 *   } catch (error) {
 *     showNotification({
 *       color: 'red',
 *       message: 'An error was encountered while getting the user projects. Please refresh the page.',
 *       title: 'Error',
 *     });
 */

/*
 *     return null;
 *   }
 * }
 */
