import React, { useContext } from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import Money from '@/public/trycheckoutimage/money.svg'

import styled from '@emotion/styled';
import Link from 'next/link';
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
const StyledLink = styled.a`
  &:hover {
    text-decoration:underline
  }
`;
export default function CheckOutMember() {
  const { memberInfo } = useContext(Cart)
  return (
    <div className='d-flex mt-3 mb-2 align-items-center justify-content-between position-relative'>
    <StyledLink href={'http://localhost:3000/topup'} className='position-absolute fs-5 text-primary' style={{bottom:"0",right:"-6%"}}>前往儲值</StyledLink>
      <div className='d-flex align-items-center w-75'>
        <img src={`${process.env.API_SERVER}/img/member/${memberInfo.photo}`} alt={memberInfo.nickname} className=' rounded-circle h-100' style={{width:"40%"}}></img>
      <div className='fs-4 ms-2'>{memberInfo.nickname}</div>
      </div>
      <div className='d-flex w-50 align-items-center'>
        <div className=' w-50 fs-4 text-secondary'>餘額:</div>
        <div className='d-flex align-items-center'>
          <Money1 src={Money.src} style={{width:"50%"}}/>
          <div>
            <div className='text-danger fs-3'> {memberInfo.wallet}</div>
          </div>
        </div>
        </div>
    </div>
  )
}
