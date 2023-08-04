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
import styled from '@emotion/styled';
const Fs23pxSpan = styled.span`
font-size:23px;
`
Fs23pxSpan.defaultProps = {
    style: {
      fontSize: '23px',
    },
  };
export default function CheckOutTotalPrice({payment, orderInfo}) {

    const {items, showPages, host, memberCoupon, memberInfo, page} = useContext(Cart)
    const router = useRouter()
    const pagePrice = () => {
    return showPages(items).length > 0 ? showPages(items).map(item => item.price * item.amount).reduce((p ,c) => p + c) : 0
    }
    const fee = 60
    const [couponId, setCouponId] = useState('')
    const [discount, setDiscount] = useState('')
    const [walletError, setWalletError] = useState(false)
    const handleChange = (event) => {
        setCouponId(event.target.value);
    };
    const totalPrice = showPages(items).length > 0 ? `${pagePrice()+ (memberInfo.level === 2 ? 0 : showPages(items).length > 0 ? fee : 0) - discount}` : 0
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
            <MenuItem value={0} className='d-flex justify-content-center' >
                不使用優惠卷
            </MenuItem>
            {memberCoupon.filter(coupon => coupon.coupon_status_sid === 1).map(c => 
                <MenuItem value={c.get_coupon_sid} className='d-flex justify-content-between' key={c.get_coupon_sid}>
                    {c.coupon_title}
                    <span className='ms-3 text-danger'>${c.coupon_discount}</span>
                </MenuItem>
            )}
            </Select>
        </FormControl>
    </Box>
    const walletAlert = () => {
        setWalletError(!walletError)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '錢包餘額不足!',
          })
    }
    useEffect(() => {
        const selectedCoupon = memberCoupon.find((coupon) => coupon.get_coupon_sid === couponId);
        if (selectedCoupon) {
          setDiscount(selectedCoupon.coupon_discount);
        }else setDiscount(0)
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
        if(memberInfo.wallet < totalPrice && payment === 'wallet') setWalletError(true)
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
                coupon_sid: couponId !== 0 ? couponId : null,
                shipfee: fee,
            }
        }
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
            return data
        }
        try{
            const response = await createOrder()
            if(response.message === 'Order created successful!') {
                const redirect = () =>  response.linepay_redirect ? setTimeout(()=>{window.location.href=response.linepay_redirect},6000) : 
                setTimeout(()=>{router.push({pathname:'http://localhost:3000/completeorder/success'})},6000)
                createOrderLoading(redirect())
            }
            else {
                throw new Error(response.error)
            }
        }catch(error){
            console.log('error', error)
            
        }
    }
  return (
    <div className='mb-2 '>
        <div className='mt-3 mx-1'>
            <div className='d-flex justify-content-between'>
                <Fs23pxSpan>商品價格</Fs23pxSpan>
                <Fs23pxSpan>$ {pagePrice()}</Fs23pxSpan>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                {page === 'order' ? 
                <>
                    <Fs23pxSpan>取餐時間</Fs23pxSpan>
                    <Fs23pxSpan>{showPages(items).length > 0 ? `這邊放時間` : '-'}</Fs23pxSpan>
                </> :
                <>
                    <Fs23pxSpan>運費/外送費(會員免運)</Fs23pxSpan>
                    <Fs23pxSpan style={memberInfo.level === 2 ? {textDecoration:"line-through"} :{}} 
                    className={memberInfo.level === 2 ? 'text-danger' : ''}
                    >{memberInfo.level === 2 ? `$ 0` : showPages(items).length > 0 ? `$ ${fee}` : 0}</Fs23pxSpan>
                </>
                }
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <Fs23pxSpan>折價卷</Fs23pxSpan>
                <Fs23pxSpan>    
                    {coupon}
                </Fs23pxSpan>
            </div>
            <div className='d-flex justify-content-between mt-4'>
                <Fs23pxSpan>總金額</Fs23pxSpan>
                <Fs23pxSpan className='text-danger'>$ {totalPrice}</Fs23pxSpan>
            </div>
        </div>
        {walletError && walletAlert()}
        <Button variant="contained" className='w-100 d-flex align-items-center mx-auto p-1  bg-warning rounded-4 mt-4 mb-2 border-0 justify-content-center fs-4' onClick={handleOrder}>結&nbsp;&nbsp;&nbsp;&nbsp;帳</Button>
    </div>
  )
}
