import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import style from '@/styles/reservation/style.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#911010',
      darker: '#053e85',
    },
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 50;

export default function SliderBar({ keyword, setKeyword }) {

  const router = useRouter();
  const [value1, setValue1] = useState([0, 1200]);





  const handleChange1 = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }

    //取得slidebar的值setKeyword
    const slideval = e.target.value;
    // console.log(e.target.value)
    setKeyword({ ...keyword, price: slideval })

    //取得其他router.query的資料，再做push.router
    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();

    const strcity = router.query.city;
    const arrdist = router.query.dist;
    const numstar = router.query.star;
    const searchkeyword = router.query.searchkeyword;

    const usp = new URLSearchParams();
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (strcity) {
      usp.set('city', strcity);
    }
    if (arrdist) {
      usp.set('dist', arrdist);
    }
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

    // router.push(url)
    router.push({
      pathname: router.pathname,
      search: url
    }, undefined, { scroll: false });
  };


  // const [value2, setValue2] = React.useState([200, 500]);

  // const handleChange2 = (event, newValue, activeThumb) => {
  //   if (!Array.isArray(newValue)) {
  //     return;
  //   }

  //   if (newValue[1] - newValue[0] < minDistance) {
  //     if (activeThumb === 0) {
  //       const clamped = Math.min(newValue[0], 100 - minDistance);
  //       setValue2([clamped, clamped + minDistance]);
  //     } else {
  //       const clamped = Math.max(newValue[1], minDistance);
  //       setValue2([clamped - minDistance, clamped]);
  //     }
  //   } else {
  //     setValue2(newValue);
  //   }
  // };

  return (
    <>
      <div className={style.mb20}>
        <p>價格範圍</p>
        <hr />
        <ThemeProvider theme={theme}>
          <Box sx={{ width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={keyword.price}
              onChange={handleChange1}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              color="primary"
              disableSwap
              max={1200}
              step={50}
              position="bottom"
            />
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
}
