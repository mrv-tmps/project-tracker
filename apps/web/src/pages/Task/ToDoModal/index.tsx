import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import React, { useState } from 'react';

import CustomLoader from 'components/CustomLoader';
import CustomModal from 'components/CustomModal';
import { createNewToDo } from 'services/ToDoService';

type Props = {
  taskId: string;
  isOpened: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

function ToDoModal(props: Props) {
  const { isOpened, onClose, onUpdate, taskId } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const formReturnType = useForm({
    initialValues: {
      description: '',
      isDone: '',
      taskId: taskId,
    },

    validate: {
      description: (val) => (val.length < 1 ? 'Description should include at least 1 characters' : null),
    },
  });

  const handleSaveToDo = async () => {
    setLoading(true);

    try {
      const toDo = await createNewToDo({
        description: formReturnType.values.description,
        is_done: false,
        task_id: formReturnType.values.taskId,
      });

      if (toDo) {
        showNotification({
          color: 'teal',
          icon: <IconCheck />,
          message: 'You have successfully created a to do task.',
          title: 'Success',
        });

        onUpdate();
        formReturnType.reset();
        onClose();
      }
    } catch (err) {
      showNotification({
        color: 'red',
        icon: <IconX />,
        message: 'You have failed to create a to do task.',
        title: 'Error',
      });
    }

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
      title={'To Do'}
      onClose={onClose}
    >
      <form onSubmit={formReturnType.onSubmit(handleSaveToDo)}>
        {renderLoading}
        <TextInput
          required
          error={formReturnType.errors['description'] && 'Invalid description'}
          label="Description"
          mb={5}
          placeholder="Install package"
          value={formReturnType.values['description']}
          onChange={(event) => formReturnType.setFieldValue('description', event.currentTarget.value)}
        />
        <Button fullWidth mt="xl" type="submit">
          {'Add To Do'}
        </Button>
      </form>
    </CustomModal>
  );
}

export default ToDoModal;
