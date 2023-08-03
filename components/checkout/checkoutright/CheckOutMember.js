import React, { useContext } from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import Money from '@/public/trycheckoutimage/money.svg'

import styled from '@emotion/styled';

const Money1 = styled.img`
    @keyframes MoneyRun{
        0%{
            transform:rotateY(0deg)
        }
        50%{
            transform:rotateY(360deg)
        }
        100%{
            transform:rotateY(720deg)
        }
    }
    animation: MoneyRun 8s ease infinite;
`
export default function CheckOutMember() {
  const { memberInfo } = useContext(Cart)
  return (
    <div className='d-flex mt-3 mb-2 align-items-center justify-content-between'>
      <div className='d-flex align-items-center w-75'>
        <img src={`${process.env.API_SERVER}/img/member/${memberInfo.photo}`} alt={memberInfo.nickname} className='border rounded-circle h-100 border-2' style={{width:"40%"}}></img>
      <div className='fs-5 ms-2'>{memberInfo.nickname}</div>
      </div>
      <div className='d-flex w-50 align-items-center'>
        <div className=' w-50 fs-4 text-secondary'>餘額:</div>
        <div className='d-flex align-items-center'>
          <Money1 src={Money.src} style={{width:"50%"}}/>
          <div className='text-danger fs-3'> {memberInfo.wallet}</div>
        </div>
        </div>
    </div>
  )
}
