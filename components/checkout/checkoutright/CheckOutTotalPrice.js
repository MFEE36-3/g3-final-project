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
font-size:18px;
`
Fs23pxSpan.defaultProps = {
    style: {
      fontSize: '18px',
    },
  };
export default function CheckOutTotalPrice({payment, orderInfo}) {

    const {items, showPages, host, memberCoupon, memberInfo, page} = useContext(Cart)
    const [date, setDate] = useState('')
    const router = useRouter()
    const pagePrice = () => {
    return showPages(items).length > 0 ? showPages(items).map(item => item.price * item.amount).reduce((p ,c) => p + c) : 0
    }
    const fee = 60
    const defaultCouponId = 0;
    const [couponId, setCouponId] = useState(defaultCouponId)
    const [discount, setDiscount] = useState('')
    const [walletError, setWalletError] = useState(false)
    const handleChange = (event) => {
        setCouponId(event.target.value);
    };
    const totalPrice = showPages(items).length > 0 ? `${pagePrice() + (page === 'order' ? 0 : memberInfo.level === 2 ? 0 : showPages(items).length > 0 ? fee : 0) - discount}` : 0
    const coupon = 
    <Box sx={{ minWidth: 200, textAlign: "center" }}>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label"  style={{fontFamily:"var(--ff1)"}}>請選擇</InputLabel>
            <Select
            className='d-flex justify-content-end '
            style={{fontSize:"18px"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={page === 'subscribe' ? 0 :couponId}
            label="折價"
            readOnly={page === 'subscribe'}
            onChange={handleChange}
            sx={{textAlign:"center",display:'flex',alignItems:"center",fontFamily:"var(--ff1)"}}
            >
            <MenuItem value={0} className='d-flex justify-content-center' style={{fontFamily:"var(--ff1)"}}>
                {page === 'subscribe' ? '該商品無法使用優惠卷' : "不使用優惠卷"}
            </MenuItem>
            {page !== 'subscribe' && memberCoupon.filter(coupon => coupon.coupon_status_sid === 1).map(c => 
                <MenuItem value={c.get_coupon_sid} className='d-flex justify-content-between' key={c.get_coupon_sid}  style={{fontFamily:"var(--ff1)"}}>
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
            html: '<div style="font-family: Mochiy Pop One;">錢包餘額不足!</div>',
          })
    }
    useEffect(() => {
        const selectedCoupon = memberCoupon.find((coupon) => coupon.get_coupon_sid === couponId);
        if (selectedCoupon) {
          setDiscount(selectedCoupon.coupon_discount);
        }else setDiscount(0)
      }, [couponId, memberCoupon]);
    useEffect(()=>{
    const orderItem = JSON.parse(localStorage.getItem('order'))
    if(!orderItem) return
    const day =  Object.values(orderItem).map(i=>i.togodate).shift() || []
    const time = Object.values(orderItem).map(i=>i.togotime).shift() || []
    setDate(`${day} ${time}`)
    },[])
    const createOrderLoading = (href) => {
        let timerInterval
        return (
            Swal.fire({
                title: '<div style="font-family: Mochiy Pop One;">交易進行中</div>',
                html: '<div style="font-family: Mochiy Pop One;">請耐心等候!</div>',
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
        const query = {...router.query}
        let orderData;
        let url;
        if(showPages(items).length === 0) return
        if(!payment) {
            return (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<div style="font-family: Mochiy Pop One;">請選擇支付方式!</div>',
              }))
        }
        if(memberInfo.wallet < totalPrice && payment === 'wallet') setWalletError(true)
        switch (query.page) {
            case 'subscribe' :
                url = `${host}/ecshop/checkout/premium`
                break
            case 'shop' :
                url = `${host}/ecshop/checkout`
                break
            case 'buy' :
                url = `${host}/buyforme/checkout_buyforme`
                break
            case 'order' :
                url = `${host}/ecshop/checkout/food`
                break
            default :
                url = `${host}/ecshop/checkout/premium`
        }
        const shopOrderData = {
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
        const subscribeOrderData = {
            sid : showPages(items).map(item=>item.itemID)
        }
        const buyOrderData = {
            order_sid: showPages(items).map(item => item.order_sid)
        }
        
        const takeoutOrderData = {         
            shop_id: showPages(items).map(item => item.shop_id).shift(),
            amount: showPages(items).map(item => Number(item.price) * Number(item.amount)).reduce((c, v) => c + v), 
            order_date: showPages(items).map(item => item.togodate).shift(),
            order_time: showPages(items).map(item => item.togotime).shift(),
            foods: showPages(items).map(item => ({
                food_id: item.itemId,
                order_item: item.itemName,
                order_num: item.amount,
                price: item.price
            })),
            payment_info: {
                shipfee: 0, 
                coupon_sid: couponId !== 0 ? couponId : null,
            }
        }
        switch (query.page) {
            case 'shop' :
                orderData = shopOrderData
                break
            case 'subscribe' :
                orderData = subscribeOrderData
                break
            case 'buy' :
                orderData = buyOrderData
                break
            case 'order' :
                orderData = takeoutOrderData
                break
            default :
                orderData = subscribeOrderData
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
            return { ...data, status: response.status }
        }
        try{
            const response = await createOrder()
            if(response.status === 200) {
                switch (page) {
                    case 'subscribe' : 
                        localStorage.removeItem('subscribe')
                        break
                    case 'shop' : 
                        localStorage.removeItem('shop')
                        break
                    case 'buy' : 
                        localStorage.removeItem('buy')
                        break
                    case 'order' : 
                        localStorage.removeItem('order')
                        break
                    default :
                        localStorage.removeItem('subscribe')
                }
                const redirect = () =>  response.linepay_redirect ? setTimeout(()=>{window.location.href=response.linepay_redirect},6000) : 
                setTimeout(()=>{router.push("completeorder/success")},6000)
                createOrderLoading(redirect())
            }else {
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
                    <Fs23pxSpan>{showPages(items).length > 0 ? `${date}` : '-'}</Fs23pxSpan>
                </> :
                <>
                    <Fs23pxSpan>運費/外送費(會員免運)</Fs23pxSpan>
                    <Fs23pxSpan style={memberInfo.level === 2 ? {textDecoration:"line-through"} :{}} 
                    className={memberInfo.level === 2 ? 'text-danger' : ''}
                    >{page === 'subscribe'? '$ 0' : memberInfo.level === 2 ? `$ 0` : showPages(items).length > 0 ? `$ ${fee}` : `$ 0`}</Fs23pxSpan>
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
