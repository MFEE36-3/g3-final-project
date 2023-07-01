import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function InputTest() {

  const [name, setName] = useState('');


  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" required />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>

      <TextField id="outlined-basic" label="Email" variant="outlined" required helperText="例如: a123@gmail.com" />

      <TextField
        id="outlined-controlled"
        label="這是不可控"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />

      <TextField
        id="outlined-controlled"
        label="這是可控"
        value={name}
        color="success"
        onChange={(e) => {
          setName(e.target.value);
          console.log(e.target.value);
        }}
      />
    </>
  );
}


