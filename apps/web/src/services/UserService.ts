import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';

import { CreateUserDto } from './../../../api/src/app/user/dto/create-user.dto';

const userApi = ApiClient.use(DefaultApi);

export async function createUser(userData: CreateUserDto) {
  try {
    const { data } = await userApi.userControllerCreate(userData);

    return data;
  } catch (error: any) {
    showNotification({
      color: 'red',
      message: 'An error was encountered while creating the user. Please refresh the page.',
      title: 'Error',
    });

    return null;
  }
}
