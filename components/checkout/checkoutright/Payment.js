import React, { useState } from 'react'
import linepay from '@/public/trycheckoutimage/Linepay.png'
import visa from '@/public/trycheckoutimage/visa.svg'
import wallet from '@/public/trycheckoutimage/wallet.svg'
import Image from 'next/image'
import {HiCheckCircle} from 'react-icons/hi'

export default function Payment({payment, setPayment}) {
    const handlePayment = (payment) => {
        setPayment(payment)
    }
    const selectLinePayClass = `border rounded-3 border-3 col-3 position-relative d-flex justify-content-center align-items-center ${payment === 'linepay' ? 'border-danger-subtle bg-warning-subtle' : 'border-dark-subtle'}`
    const selectCardClass = `border border-3 rounded-3 col-3 position-relative d-flex ${payment === 'card' ? 'border-danger-subtle bg-warning-subtle ' : 'border-dark-subtle'}`
    const selectWalletClass = `border border-3 rounded-3 col-3 position-relative ${payment === 'wallet' ? 'border-danger-subtle bg-warning-subtle ' : 'border-dark-subtle'}`
  return (
    <>
              {!payment && <div className='text-danger fs-4'>請選擇支付方式</div>}
        <div className='d-flex justify-content-between'>
            <div className={selectWalletClass} onClick={()=>{handlePayment('wallet')}}>
                {payment === 'wallet' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={wallet.src} alt='wallet' className='w-100'></img>
            </div>
            <div className={selectCardClass} onClick={()=>{handlePayment('card')}}>
                {payment === 'card' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={visa.src} alt='card' className='w-100'></img>
            </div>
            <div className={selectLinePayClass} onClick={()=>{handlePayment('linepay')}}>
                {payment === 'linepay' &&<HiCheckCircle className='position-absolute top-0 fs-4 text-danger' style={{right:"0"}}/>}
                <img src={linepay.src} alt='linepay' className='w-50 h-50 position-absolute object-fit-contain'></img>
            </div>  
        </div>
    </>
  )
}
