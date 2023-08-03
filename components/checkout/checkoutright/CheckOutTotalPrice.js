import React, { useContext , useEffect, useState} from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
export default function CheckOutTotalPrice({payment, orderInfo}) {
    const {items, showPages, host, memberCoupon} = useContext(Cart)
    const router = useRouter()
    const pagePrice = () => {
    return showPages(items).length > 0 ? showPages(items).map(item => item.price * item.amount).reduce((p ,c) => p + c) : 0
    }
    const fee = 60
    const [couponId, setCouponId] =useState('');
    const [discount, setDiscount] = useState('')
    const handleChange = (event) => {
        setCouponId(event.target.value);
    };

    const coupon = 
    <Box sx={{ minWidth: 200, textAlign: "center" }}>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">請選擇</InputLabel>
            <Select
            className='d-flex justify-content-end fs-5 '
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={couponId}
            label="折價"
            onChange={handleChange}
            sx={{textAlign:"center",display:'flex',alignItems:"center"}}
            >
            
            {memberCoupon.filter(coupon => coupon.coupon_status_sid === 1).map(c => <MenuItem value={c.get_coupon_sid} className='d-flex justify-content-between' key={c.get_coupon_sid}>
            {c.coupon_title}
            <span className='ms-3 text-danger'>${c.coupon_discount}</span>
            </MenuItem>)}
            </Select>
        </FormControl>
    </Box>
    useEffect(() => {
        const selectedCoupon = memberCoupon.find((coupon) => coupon.get_coupon_sid === couponId);
        if (selectedCoupon) {
          setDiscount(selectedCoupon.coupon_discount);
        }
      }, [couponId, memberCoupon]);
    const createOrderLoading = (href) => {
        let timerInterval
        return (
            Swal.fire({
                title: '交易進行中!',
                html: '請耐心等候',
                timer: 6000,
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 6000)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) href
        })
        )
        }
    const handleOrder = async () => {
        if(showPages(items).length === 0) return
        if(!payment) return
        const url = `${host}/ecshop/checkout`
        const orderData = {
            items : showPages(items).map(item => ({
                item_id: item.itemId,
                amount: item.amount
            })),
            address_info : {
                name:orderInfo.name,
                address:orderInfo.address,
                phone_number:orderInfo.phone
            },
            payment_info : {
                payment_type: payment,
                coupon_sid: couponId
            }
        }
        console.log(orderData)
        console.log(orderInfo)
        console.log(memberCoupon)
        const createOrder = async () =>{
            const member = JSON.parse(localStorage.getItem('auth'))
            const response = await fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${member.token}`
                  },
                body:JSON.stringify(orderData)
            })
            const data = await response.json();
            if(data.message === 'Order created successful!') {
                const redirect = () =>  data.linepay_redirect ? setTimeout(()=>{window.location.href=data.linepay_redirect},6000) : 
                setTimeout(()=>{router.push({pathname:'http://localhost:3000/completeorder'})},6000)
                createOrderLoading(redirect())
            } 
        }
        try{
            await createOrder()
            console.log('success')
        }catch(error){
            console.log('error', error)
        }
    }
  return (
    <div className='mb-2 '>
        <div className='mt-3 mx-1'>
            <div className='d-flex justify-content-between'>
                <span style={{fontSize:"18px"}}>商品價格</span>
                <span style={{fontSize:"18px"}}>$ {pagePrice()}</span>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <span style={{fontSize:"18px"}}>運費/外送費</span>
                <span style={{fontSize:"18px"}}>$ {showPages(items).length > 0 ? fee : 0}</span>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <span style={{fontSize:"18px"}}>折價卷</span>
                <span>    
                    {coupon}
                </span>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <span style={{fontSize:"18px"}}>總金額</span>
                <span style={{fontSize:"18px"}} className='text-danger'>$ {showPages(items).length > 0 ? `${pagePrice()+ (showPages(items).length > 0 ? fee : 0 ) - discount}` : 0}</span>
            </div>
        </div>
        <Button variant="contained" className='w-100 d-flex align-items-center mx-auto p-1  bg-warning rounded-4 mt-5 mb-2 border-0 justify-content-center fs-4' onClick={handleOrder}>結&nbsp;&nbsp;&nbsp;&nbsp;帳</Button>
    </div>
  )
}
