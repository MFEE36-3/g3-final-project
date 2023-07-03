import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from '@/styles/reservation/style.module.css';

export default function SearchBar() {
  return (
    <>
      <div className={style.searchbar}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          // className={style.borderradius}
        />
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          // className={style.borderradius}
        />
      </div>
    </>
  );
}
