import React from 'react'
import TextField from '@mui/material/TextField';

export default function SendAddress() {
  return (
    <div className='row mt-1'>
        <div className='col border-top border-bottom py-5 border-3 border-dark-subtle'>
            <TextField id="filled-basic" label="收件人姓名" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }} 
            className='w-100 rounded-1'/>
            <TextField id="filled-basic" label="收件人地址" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }} 
            className='w-100 rounded-1 mt-4'/>
            <TextField id="filled-basic" label="收件人電話" variant="filled" required
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }}
             className='w-100 rounded-1 mt-4'/>
            
        </div>
    </div>
  )
}
