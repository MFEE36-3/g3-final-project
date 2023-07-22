import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MultiActionAreaCard from '@/components/common/card-test';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function MyApp() {
  const label = { value: 666 }

  function consoleDate(date) {
    console.log(date);
    console.log(date['$d']);

    const daytostring = dayjs(date['$d']).format('YYYY-MM-DD');
    console.log(daytostring);
  }

  const [value, setValue] = useState("");

  return (
    <>
      <style jsx>
        {`

      p {
        margin:50px 50px;
      }


      `}
      </style>

      <div>
        <Button variant="contained">Hello World</Button>

        <Button style={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}>inline-style</Button>


        <Checkbox {...label} defaultChecked />
        <Checkbox {...label} />
        <Checkbox {...label} disabled />
        <Checkbox {...label} disabled checked />
        <p>是在哈囉</p>
        <MultiActionAreaCard textColor={'tomato'} />
        <p>給我分開</p>
        {/* date/time picker元件要包在 LocalizationProvider內 並經過AdapterDayjs*/}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker defaultValue={dayjs('06-09-2023')} onChange={consoleDate} />
          <p>給我分開啦</p>
          <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <TimePicker
              className='marginout'
              label="Uncontrolled picker"
              defaultValue={dayjs('2022-04-17T15:30')}
            />
            <TimePicker
              className='marginout'
              sx={{
                width: 600,
                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                  'backgroundColor': 'pink',
                  'color': 'white'
                }
              }}    // 用sx改style
              label="Controlled picker"
              //value={}  //看要不要給一個初始值(state之類ㄉ)
              onChange={(newValue) => setValue(dayjs(newValue['$d']).format('HH-mm-ss'))}
            />
          </div>
        </LocalizationProvider>

      </div>

    </>
  );
}


