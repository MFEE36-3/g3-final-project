import React, { useState } from 'react'
import linepay from '@/public/trycheckoutimage/Linepay.png'
import visa from '@/public/trycheckoutimage/visa.svg'
import check from '@/public/trycheckoutimage/check.svg'
import Alert from '@/public/trycheckoutimage/alert.svg'
import {HiCheckCircle} from 'react-icons/hi'
import styled from '@emotion/styled';

const Cusimg = styled.img`
@keyframes alert{
    0% {
        transform: rotate(0);
    }
    25% {
        transform: rotate(10deg);
    }
    50% {
        transform: rotate(-10deg)
    }
}
animation: alert 2s ease infinite;
`
export default function PaymentForCash({payment, setPayment}) {
    
    const handlePayment = (payment) => {
        setPayment(payment)
    }
    const selectLinePayClass = `border rounded-3 me-5 border-3 col-3 position-relative d-flex justify-content-center align-items-center ${payment === 'linepay' ? 'border-danger-subtle bg-warning-subtle' : 'border-dark-subtle'}`
    const selectCardClass = `border border-3 rounded-3 col-3 position-relative d-flex ${payment === 'card' ? 'border-danger-subtle bg-warning-subtle ' : 'border-dark-subtle'}`
  return (
    <>
        
        <div className='d-flex align-items-center ps-4'>
        {!payment ? <Cusimg src={Alert.src} style={{width:"5%"}}></Cusimg> : <img src={check.src} style={{width:"5%"}}></img>}
            <div className={`fs-4 ms-2 ${!payment ? 'text-danger' : 'text-success'}`}style={{fontFamily:"Zen Maru Gothic"}}>請選擇支付方式</div>
        </div>
        <div className='d-flex my-4 w-50 ps-4'>
            <div className={selectLinePayClass} style={{cursor:'pointer'}} onClick={()=>{handlePayment('linepay')}}>
                {payment === 'linepay' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={linepay.src} alt='linepay' className='w-50 h-50 position-absolute object-fit-contain'></img>
            </div>  
            <div className={selectCardClass} style={{cursor:'pointer'}} onClick={()=>{handlePayment('card')}}>
                {payment === 'card' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={visa.src} alt='card' className='w-100'></img>
            </div>
        </div>
    </>
  )
}
