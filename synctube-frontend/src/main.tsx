import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client.ts'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme} >
        <CssBaseline/>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
