import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import { useState } from 'react';

import CustomLoader from 'components/CustomLoader';
import CustomModal from 'components/CustomModal';
import { useAuth } from 'contexts/AuthProvider';
import { createNewComment } from 'services/CommentService';

type Props = {
  taskId: string;
  isOpened: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

function CommentModal(props: Props) {
  const { isOpened, onClose, onUpdate, taskId } = props;
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const userHasDisplayName = userDetails?.displayName && userDetails?.displayName.length > 0;

  const commentForm = useForm({
    initialValues: {
      comment: '',
      commenter: userHasDisplayName ? userDetails?.displayName : '',
      taskId: taskId,
    },

    validate: {
      comment: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
      commenter: (val: string) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
    },
  });

  const handleSaveComment = async () => {
    setLoading(true);

    try {
      const comment = await createNewComment({
        commenter_user_id: commentForm.values.commenter ?? '',
        description: commentForm.values.comment,
        task_id: commentForm.values.taskId,
      });

      if (comment) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully created a new comment.',
          title: 'Success',
        });

        onUpdate();
        commentForm.reset();
        onClose();
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'You have failed to create a new comment.',
        title: 'Error',
      });
    }

    setLoading(false);
  };

  const renderCommenterInput = userHasDisplayName ?? <TextInput
    required
    error={commentForm.errors['commenter'] && 'Invalid commenter id'}
    label="Commenter"
    mb={5}
    placeholder="Commenter Name"
    value={commentForm.values['commenter'] ?? ''}
    onChange={(event) => commentForm.setFieldValue('commenter', event.currentTarget.value)}
  />;

  const renderLoading = loading && <CustomLoader />;

  return (
    <CustomModal
      centered
      opened={isOpened}
      overlayBlur={3}
      overlayColor={'gray'}
      overlayOpacity={0.55}
      title={'Add a Comment'}
      onClose={onClose}
    >
      <form onSubmit={commentForm.onSubmit(handleSaveComment)}>
        {renderLoading}
        <TextInput
          required
          error={commentForm.errors['comment'] && 'Invalid comment'}
          label="Comment"
          mb={5}
          placeholder="Currently in progress with a button"
          value={commentForm.values['comment']}
          onChange={(event) => commentForm.setFieldValue('comment', event.currentTarget.value)}
        />
        {renderCommenterInput}
        <Button fullWidth mt="xl" type="submit">
          {'Add Comment'}
        </Button>
      </form>
    </CustomModal>
  );
}

export default CommentModal;
