import { MantineProvider } from '@mantine/core';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { AuthProvider } from './contexts/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>
);