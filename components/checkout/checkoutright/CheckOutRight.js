import React, { useState } from 'react'
import CardContainer from './CardContainer'
import Payment from './Payment'
import CheckOutMember from './CheckOutMember'
import PaymentBody from './PaymentBody'
import CheckOutTotalPrice from './CheckOutTotalPrice'
import SendAddress from './SendAddress'
export default function CheckoutRight() {
  const [payment,setPayment] = useState('')
  const [clickConfirm, setClickConfirm] = useState()
  const [orderInfo, setOrderInfo] = useState({name:'', address:'', phone:''})
  return (
    <div className='col-5'>
      <CardContainer>
        <CheckOutMember/>
        <Payment payment={payment} setPayment={setPayment}/>
        <div>
          <SendAddress orderInfo={orderInfo} setOrderInfo={setOrderInfo}/>
          <CheckOutTotalPrice payment={payment} orderInfo={orderInfo}/>
        </div>
        
      </CardContainer>
    </div>
  )
}
