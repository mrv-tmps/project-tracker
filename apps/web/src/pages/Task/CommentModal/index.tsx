import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import React, { useState } from 'react';

import CustomLoader from 'components/CustomLoader';
import CustomModal from 'components/CustomModal';
import { useAuth } from 'contexts/AuthProvider';

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

  const commentForm = useForm({
    initialValues: {
      assignedId: userDetails?.displayName ?? '',
      comment: '',
      taskId: taskId,
    },

    validate: {
      assignedId: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
      comment: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
    },
  });

  const handleSaveComment = async () => {
    setLoading(true);

    /*
     * try {
     *   const comment = await createNewComment({
     *     assignedId: commentForm.values.assignedId,
     *     comment: commentForm.values.comment,
     *     task_id: commentForm.values.taskId,
     *   });
     */

    /*
     *   if (comment) {
     *     showNotification({
     *       color: 'teal',
     *       icon: <IconCheck />,
     *       message: 'You have successfully created a new comment.',
     *       title: 'Success',
     *     });
     */

    /*
     *     onUpdate();
     *     commentForm.reset();
     *     onClose();
     *   }
     * } catch (err) {
     *   showNotification({
     *     color: 'red',
     *     icon: <IconX />,
     *     message: 'You have failed to create a new comment.',
     *     title: 'Error',
     *   });
     * }
     */

    setLoading(false);
  };

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
          placeholder="Have initialized project requirements"
          value={commentForm.values['comment']}
          onChange={(event) => commentForm.setFieldValue('comment', event.currentTarget.value)}
        />
        <TextInput
          required
          error={commentForm.errors['assignedId'] && 'Invalid assigned id'}
          label="Commentator"
          mb={5}
          placeholder="Assigned User ID"
          value={commentForm.values['assignedId'] ?? ' '}
          onChange={(event) => commentForm.setFieldValue('assignedId', event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" type="submit">
          {'Add Comment'}
        </Button>
      </form>
    </CustomModal>
  );
}

export default CommentModal;
