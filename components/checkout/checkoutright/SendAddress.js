import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import styled from '@emotion/styled';
import { Cart } from '@/components/checkout/CheckOutFinal'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const CustomTextField = styled(TextField)({
  '& label' : {
    fontFamily:"Zen Maru Gothic",
    fontSize:'var(--h9)'
  }
})
export default function SendAddress({setOrderInfo}) {
  const { memberInfo } = useContext(Cart);
  const [defaultInfo, setDefaultInfo] = useState(true)
  const [name, setName] = useState(memberInfo.name);
  const [address, setAddress] = useState(memberInfo.address);
  const [phone, setPhone] = useState(memberInfo.phone);
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
        <div className=' border-top pt-3 border-3 border-dark-subtle'>
            <CustomTextField id="filled-basic" label="收件人姓名" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '16px',
                marginTop: '8px' ,
                marginBottom: '5px',
                fontFamily:"Zen Maru Gothic"
              },
              readOnly:defaultInfo
            }} 
            defaultValue={memberInfo.name}
            onChange={(e)=>setName(e.target.value)}
            onBlur={()=>handleInfo()}
            value={defaultInfo ? memberInfo.name : name}
            className='w-100 rounded-1'/>
            <CustomTextField id="filled-basic" label="收件人地址" variant="filled" required 
            InputProps={{
              style: {
                fontSize: '16px',
                marginTop: '5px' ,
                fontFamily:"Zen Maru Gothic"
              },
              readOnly:defaultInfo
            }} 
            defaultValue={memberInfo.address}
            value={defaultInfo ? memberInfo.address : address}
            onChange={(e)=>setAddress(e.target.value)}
            onBlur={()=>handleInfo()}
            className='w-100 rounded-1'/>
            <CustomTextField id="filled-basic" label="收件人電話" variant="filled" required
            InputProps={{
              style: {
                fontSize: '16px',
                marginTop: '8px' ,
                fontFamily:"Zen Maru Gothic"
              },
              readOnly:defaultInfo
              
            }}
            defaultValue={ memberInfo.mobile }
            onChange={(e)=>setPhone(e.target.value)}
            onBlur={()=>handleInfo()}
            value={defaultInfo ? memberInfo.mobile : phone}
            className='w-100 rounded-1'/>
        </div>
        <div className='d-flex align-items-center  border-bottom  border-3 border-dark-subtle'>
              <Checkbox {...label} 
              defaultChecked 
              onChange={handleDefaultInfo}  
              />
              <span>同會員資訊</span>
        </div>
    </div>
  )
}
