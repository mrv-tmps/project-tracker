import { showNotification } from '@mantine/notifications';
import { DefaultApi } from '@project-tracker/api-lib';

import ApiClient from '../api-client';

import { CreateCommentDto } from './../../../api/src/app/comment/dto/create-comment.dto';

const commentApi = ApiClient.use(DefaultApi);

export async function createNewComment(createCommentDto: CreateCommentDto) {
  try {
    const data = await commentApi.commentControllerCreate(createCommentDto);

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

export async function fetchComments(taskId: string) {
  try {
    const data = await commentApi.commentControllerGetCommentByTaskId(taskId);

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
