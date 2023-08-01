import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Cart } from '@/components/checkout/CheckOutFinal'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function SendAddress({setOrderInfo}) {
  const [formVerify, setFormVerify] = useState('');
  const { member } = useContext(Cart);
  const [defaultInfo, setDefaultInfo] = useState(true)
  const [name, setName] = useState(member.name);
  const [address, setAddress] = useState(member.address);
  const [phone, setPhone] = useState(member.phone);
  const handleDefaultInfo = () => {
      setDefaultInfo(!defaultInfo)
  }
  const handleInfo = () => {
    setOrderInfo(prev => ({
      ...prev,
      name:name,
      address:address,
      phone:phone
    }))
  }
  return (
    <div className='row mt-1'>
        <div className='col border-top pt-5 border-3 border-dark-subtle'>
            <TextField id="filled-basic" label="收件人姓名" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }} 
            defaultValue={member.name}
            onChange={(e)=>setName(e.target.value)}
            onBlur={()=>handleInfo()}
            value={defaultInfo ? member.name : ''}
            className='w-100 rounded-1'/>
            <TextField id="filled-basic" label="收件人地址" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }} 
            defaultValue={member.address}
            value={defaultInfo ? member.address : ''}
            onChange={(e)=>setAddress(e.target.value)}
            onBlur={()=>handleInfo()}
            className='w-100 rounded-1 mt-4'/>
            <TextField id="filled-basic" label="收件人電話" variant="filled" required
            InputProps={{
              style: {
                fontSize: '25px', 
              },
            }}
            defaultValue={ member.phone }
            onChange={(e)=>setPhone(e.target.value)}
            onBlur={()=>handleInfo()}
            value={defaultInfo ? member.phone : ''}
             className='w-100 rounded-1 mt-4'/>
        </div>
        <div className='d-flex align-items-center  border-bottom  border-3 border-dark-subtle'>
              <Checkbox {...label} defaultChecked onChange={handleDefaultInfo}  className='mt-2'/>
              <span>同會員資訊</span>
        </div>
    </div>
  )
}
