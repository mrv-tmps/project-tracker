import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

import React, { useState } from 'react';

import CustomModal from 'components/CustomModal';

type Props = {
  taskId: string;
  isOpened: boolean;
  onClose: () => void;
}

function ToDoModal(props: Props) {
  const { isOpened, onClose, taskId } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const formReturnType = useForm({
    initialValues: {
      description: '',
      isDone: '',
      taskId: taskId,
    },

    validate: {
      description: (val) => (val.length < 1 ? 'Password should include at least 1 characters' : null),
    },
  });

  const handleSaveToDo = async () => {
    setLoading(true);

    try {
      const project = true; // await createNewProject({
      /*
       * created_by: formReturnType.values.id,
       * is_active: true,
       * name: formReturnType.values.name,
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
         * formReturnType.reset();
         * toggleToDoModalDisplay();
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
      title={'To Do'}
      onClose={onClose}
    >
      <form onSubmit={formReturnType.onSubmit(handleSaveToDo)}>
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
