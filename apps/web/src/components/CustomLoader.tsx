import { LoadingOverlay } from '@mantine/core';

export default function CustomLoader() {
  return (
    <LoadingOverlay
      visible
      loaderProps={{ size: 'lg', variant: 'bars' }}
      overlayOpacity={0.3}
    />
  );
}
