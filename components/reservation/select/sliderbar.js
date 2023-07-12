import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import style from '@/styles/reservation/style.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const minDistance = 10;

export default function SliderBar() {
  const [value1, setValue1] = React.useState([200,500]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }

    console.log(value1)
  };

  const [value2, setValue2] = React.useState([200, 500]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  return (
    <>
      <div className={style.mb20}>
        <p>價格範圍</p>
        <hr />
        <ThemeProvider theme={theme}>
          <Box sx={{ width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              color="primary"
              disableSwap
              max={1200}
              step={50}
            />
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
}
