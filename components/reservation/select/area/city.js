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

  const router = useRouter();

  const handleChangeCity = (e) => {
    const selectedCity = e.target.value;
    setKeyword({ ...keyword, city: selectedCity })

    const strcity = selectedCity;

    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();


    const queryParams = new URLSearchParams();
    if (strfoodtype) {
      queryParams.set('foodtype', strfoodtype);
    }
    if (strcity) {
      queryParams.set('city', strcity);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = queryParams.toString();

    // 修改 router.push 部分
    let url = '/reservation';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push(url);

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
            onChange={handleChangeCity}
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
