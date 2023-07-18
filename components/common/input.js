import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputTest({label='input name',placeholder='',helperText='',required=false,error=false}) {

  const [value,setValue] = useState([])

  return (
    <>
      <TextField
        error={error}
        id="outlined-basic"
        label={label}
        variant="outlined"
        required={required}
        helperText={helperText}
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        sx={{
          '&:hover fieldset': {
            backgroundColor: 'rgba(153,153,153,0.2)',
          },
        }}
      />
    </>
  );
}


