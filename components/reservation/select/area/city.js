import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from '@/styles/reservation/style.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#911010',
      darker: '#053e85',
    },
  },
});

export default function City({ keyword, setKeyword }) {
  // const [city, setCity] = useState('');

  const router = useRouter();

  const handleChangeCity = (e) => {
    setKeyword({ ...keyword, city: e.CurrentTarget.value })

    const strcity = keyword.city;
    console.log(keyword)

    router.push(`/reservation?city=${strcity}`)
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ Width: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">--請選擇縣市--</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={keyword.city}
            label="city"
            onChange={(e) => (handleChangeCity)}
            color="primary"
          >
            <MenuItem value={'tpe'}>台北市</MenuItem>
            <MenuItem value={'ntp'}>新北市</MenuItem>
            <MenuItem value={'klc'}>基隆市</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
