import { useState, useEffect } from 'react';
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


export default function City({ keyword, setKeyword, cdata, setCdata }) {

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurants/city`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setCdata(data.rows);
      })
  }, [])

  const handleChangeCity = (e) => {
    const selectedCity = e.target.value;
    setKeyword({ ...keyword, city: selectedCity })

    const strcity = selectedCity;
    const arrdist = router.query.dist;

    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();

    const slideval = router.query.price;
    const numstar = router.query.star;
    const searchkeyword = router.query.searchkeyword;


    const usp = new URLSearchParams();
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (strcity) {
      usp.set('city', strcity);
    } 
    // if (arrdist) {
    //   usp.set('dist', '');
    // }
    if (slideval) {
      usp.set('price', slideval);
    }
    if (numstar){
      usp.set('star', numstar);
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString();

    // 修改 router.push 部分
    let url = '';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push({
      pathname: router.pathname,
      search: url
    }, undefined, { scroll: false });
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
            {/* <MenuItem value={''}>--請選擇縣市--</MenuItem> */}
            {cdata.map((v) => {
              const { city_sid, city_id, cityname } = v;
              return (
                <MenuItem key={city_sid} value={cityname}>{cityname}</MenuItem>)
            })}

          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
