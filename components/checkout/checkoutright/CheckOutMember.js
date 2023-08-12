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
    <div className='d-flex mt-3 mb-2 align-items-center justify-content-between position-relative' >
      <StyledLink href={'http://localhost:3000/topup'} className='position-absolute fs-5 text-primary' style={{ bottom: "0", right: "-2%", fontFamily: "var(--ff2)" }}>前往儲値</StyledLink>
      <div className='d-flex align-items-center w-75'>
        <div style={{ backgroundImage: `url(${process.env.API_SERVER}/img/member/${memberInfo.photo})`, width: 100, height: 100, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', borderRadius: '50%', backgroundPosition: 'center' }}>
        </div>
        <div className='fs-4 ms-2'>{memberInfo.nickname}</div>
      </div>
      <div className='d-flex w-50 align-items-center'>
        <div className=' w-50 fs-4 text-secondary' style={{ fontFamily: "var(--ff2)" }}>餘額:</div>
        <div className='d-flex align-items-center'>
          <Money1 src={Money.src} style={{ width: "50%" }} />
          <div>
            <div className='text-danger fs-3' style={{ fontFamily: "var(--ff2)" }}> {memberInfo.wallet}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
