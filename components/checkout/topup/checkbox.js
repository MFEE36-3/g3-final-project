import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography'; // 添加這行

export default function CheckBox({addValue, setAddValue}) {
    const value = [100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 30000]
    const [selectedValue, setSelectedValue] = React.useState(value[0]);

    const handleChange = (event) => {
      setSelectedValue(Number(event.target.value)); 
      setAddValue(Number(event.target.value))
    };
    const addValueFunc = () => {
        return value.map(v => (
        <div key={v} className='w-25 mb-4 '>
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === v} 
              onChange={handleChange}
              value={v}
            />
          }
          label={
            <Typography variant="h6">
              $ {v}
            </Typography>
          }
          labelPlacement='end'
          className='fs-2'
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        />
        </div>
        ))
    }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className='fs-4 ps-4 text-danger' style={{fontFamily:"Zen Maru Gothic"}}>請選擇儲値金額</FormLabel>
      <FormGroup aria-label="position" row className='ms-2 ps-4 d-flex justify-content-between w-100'>
        {addValueFunc()}
      </FormGroup>
    </FormControl>
  );
}
