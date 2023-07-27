import React, { useContext , useState} from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
export default function CheckOutTotalPrice() {
    const {page, items, showPages} = useContext(Cart)
        const pagePrice = () => {
        // return showPages(items).map(item => item.price*item.amount).reduce((p ,c) => p + c)
        return showPages(items).length > 0 ? showPages(items).map(item => item.price * item.amount).reduce((p ,c) => p + c) : 0
    }
    const fee = 60
    const [discount, setDiscount] =useState('');

    const handleChange = (event) => {
        setDiscount(event.target.value);
    };
    const linePay = async () => {
        const res = await fetch('http://localhost:3000/checkout/1')
        const json = await res.json();
        const url = `http://localhost:3000/createorder/${json.orderId}`
        const order_res = await fetch(url, { method: "POST" });
        const { redirect } = await order_res.json();
        window.location.href = redirect;
    }
  return (
    <div className='mb-2'>
        <div className='mt-3 mx-1'>
            <div className='d-flex justify-content-between'>
                <span style={{fontSize:"25px"}}>商品價格</span>
                <span style={{fontSize:"25px"}}>${pagePrice()}</span>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <span style={{fontSize:"25px"}}>運費/外送費</span>
                <span style={{fontSize:"25px"}}>${showPages(items).length > 0 ? fee : 0}</span>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <span style={{fontSize:"25px"}}>折價卷</span>
                <span>    
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">優惠卷</InputLabel>
                            <Select
                            className='d-flex justify-content-end fs-5 '
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discount}
                            label="折價"
                            onChange={handleChange}
                            sx={{textAlign:"center",display:'flex',alignItems:"center"}}
                            >
                            <MenuItem value={10} className='d-flex justify-content-center'>$ 1 0</MenuItem>
                            <MenuItem value={20} className='d-flex justify-content-center'>$ 2 0</MenuItem>
                            <MenuItem value={30} className='d-flex justify-content-center'>$ 3 0</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </span>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <span style={{fontSize:"25px"}}>總金額</span>
                <span style={{fontSize:"25px"}} className='text-danger'>${pagePrice()+ (showPages(items).length > 0 ? fee : 0) - discount}</span>
            </div>
        </div>
        <Button variant="contained" className='w-100 d-flex align-items-center mx-auto p-1 bg-warning rounded-4 mt-3 mb-2 border-0 justify-content-center fs-4' onClick={()=>linePay()}>結&nbsp;&nbsp;&nbsp;&nbsp;帳</Button>
    </div>
  )
}
