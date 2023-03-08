import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';

import { CreateProjectDto } from './../../../api/src/app/project/dto/create-project.dto';

const projectApi = ApiClient.use(DefaultApi);

export async function createNewProject(createProjectDto: CreateProjectDto) {
  try {
    const data = await projectApi.projectControllerCreateNewProject(createProjectDto);

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

export async function fetchUserProjects() {
  try {
    const data = await projectApi.projectControllerGetAllProjects();

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
    const data = await projectApi.projectControllerGetProject(projectId);

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
