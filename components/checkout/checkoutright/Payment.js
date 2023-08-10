import React, { useState } from 'react'
import linepay from '@/public/trycheckoutimage/Linepay.png'
import visa from '@/public/trycheckoutimage/visa.svg'
import wallet from '@/public/trycheckoutimage/wallet.svg'
import Alert from '@/public/trycheckoutimage/alert.svg'
import {HiCheckCircle} from 'react-icons/hi'
import check from '@/public/trycheckoutimage/check.svg'
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
export default function Payment({payment, setPayment}) {

    const handlePayment = (payment) => {
        setPayment(payment)
    }
    const selectLinePayClass = `border rounded-3 border-3 col-3 position-relative d-flex justify-content-center align-items-center ${payment === 'linepay' ? 'border-danger-subtle bg-warning-subtle' : 'border-dark-subtle'}`
    const selectCardClass = `border border-3 rounded-3 col-3 position-relative d-flex ${payment === 'card' ? 'border-danger-subtle bg-warning-subtle ' : 'border-dark-subtle'}`
    const selectWalletClass = `border border-3 rounded-3 col-3 position-relative ${payment === 'wallet' ? 'border-danger-subtle bg-warning-subtle ' : 'border-dark-subtle'}`
  return (
    <>
        <div className='d-flex align-items-center'>
        {!payment ? <Cusimg src={Alert.src} style={{width:"7%"}}></Cusimg> : <img src={check.src} style={{width:"7%"}}></img>}
            <div className={`fs-5 ms-2 ${!payment ? 'text-danger' : 'text-success'}`}>請選擇支付方式</div>
        </div>
        <div className='d-flex justify-content-between mt-3 mb-3'>
            <div className={selectWalletClass} style={{cursor:'pointer',width:"20%"}} onClick={()=>{handlePayment('wallet')}}>
                {payment === 'wallet' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={wallet.src} alt='wallet' className='w-100'></img>
            </div>
            <div className={selectCardClass} style={{cursor:'pointer',width:"20%"}} onClick={()=>{handlePayment('card')}}>
                {payment === 'card' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={visa.src} alt='card' className='w-100'></img>
            </div>
            <div className={selectLinePayClass} style={{cursor:'pointer',width:"20%"}} onClick={()=>{handlePayment('linepay')}}>
                {payment === 'linepay' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={linepay.src} alt='linepay' className='w-50 h-50 position-absolute object-fit-contain'></img>
            </div>  
        </div>
    </>
  )
}
