import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from '@/styles/reservation/style.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#911010',
      darker: '#053e85',
    },
  },
});

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ Width: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">--請選擇縣市--</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            color="primary"
          >
            <MenuItem value={10}>台北市</MenuItem>
            <MenuItem value={20}>新北市</MenuItem>
            <MenuItem value={30}>基隆市</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
