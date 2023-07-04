import React, { useState } from 'react'
import CardContainer from './CardContainer'
import Payment from './Payment'
import CheckOutMember from './CheckOutMember'
import PaymentBody from './PaymentBody'
import CheckOutTotalPrice from './CheckOutTotalPrice'
export default function CheckoutRight() {
  const [selected,setSelected] = useState(0)
  return (
    <div className='col-5'>
      <CardContainer>
        <CheckOutMember/>
        <Payment selected={selected} setSelected={setSelected}/>
        <PaymentBody selected={selected}/>
        <CheckOutTotalPrice/>
      </CardContainer>
    </div>
  )
}
