import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import React, { useState } from 'react';

import CustomModal from 'components/CustomModal';
import { useAuth } from 'contexts/AuthProvider';

type Props = {
  taskId: string;
  isOpened: boolean;
  onClose: () => void;
}

function CommentModal(props: Props) {
  const { userDetails } = useAuth();
  const { isOpened, onClose, taskId } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const commentForm = useForm({
    initialValues: {
      assignedId: userDetails?.displayName,
      comment: '',
      taskId: taskId,
    },

    validate: {
      comment: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
    },
  });

  const handleSaveComment = async () => {
    setLoading(true);

    try {
      const project = true; // await createNewProject({
      /*
       * created_by: commentForm.values.id,
       * is_active: true,
       * name: commentForm.values.name,
       * });
       */

      if (project) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully created a new project.',
          title: 'Success',
        });

        /*
         * getTaskToDos();
         * commentForm.reset();
         * toggleCommentModalDisplay();
         */
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'You have failed to create a new project.',
        title: 'Error',
      });
    }

    setLoading(false);
  };

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
        <TextInput
          required
          error={commentForm.errors['comment'] && 'Invalid comment'}
          label="Comment"
          mb={5}
          placeholder="Have initialized project requirements"
          value={commentForm.values['comment']}
          onChange={(event) => commentForm.setFieldValue('comment', event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" type="submit">
          {'Add Comment'}
        </Button>
      </form>
    </CustomModal>
  );
}

export default CommentModal;
