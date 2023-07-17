import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputArea({ label = 'input name', placeholder = '', helperText = '', required = false, error = false, fullWidth = false, onChange = () => { } }) {



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
        fullWidth={fullWidth}
        sx={{
          '&:hover fieldset': {
            backgroundColor: 'rgba(153,153,153,0.2)',
          },
        }}
        onChange={onChange}
      />
    </>
  );
}


