import React, { useContext } from 'react'
import jayni from '@/public/trycheckoutimage/jayni.png'
import { Cart } from '@/components/checkout/CheckOutFinal'
export default function CheckOutMember() {
  const { memberInfo, member } = useContext(Cart)
  return (
    <div className='d-flex justify-content-between mt-1 align-items-center'>
        <h4>{member.nickname}</h4>
        <img src={jayni.src} alt='turtle' className='border rounded-circle w-25 h-100 border-2 border-warning' ></img>
    </div>
  )
}
