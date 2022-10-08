import { LoadingOverlay } from '@mantine/core';

export default function CustomLoader() {
  return (
    <LoadingOverlay
      visible
      loaderProps={{ size: 'sm', variant: 'bars' }}
      overlayColor="#c5c5c5"
      overlayOpacity={0.3}
    />
  );
}
