import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#911010',
      darker: '#053e85',
    },
  },
});

export default function SidebarBtn() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        GO!
      </Button>
    </ThemeProvider>
  );
}
