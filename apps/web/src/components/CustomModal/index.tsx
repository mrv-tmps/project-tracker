import { Modal, ModalProps } from '@mantine/core';

type Props = ModalProps & {
  children: JSX.Element;
}

export default function CustomModal(props: Props): JSX.Element {
  const { children, ...otherProps } = props;

  return (
    <Modal
      {...otherProps}
    >
      {children}
    </Modal>
  );
}
