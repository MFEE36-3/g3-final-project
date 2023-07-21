import React from 'react'
import jayni from '@/public/trycheckoutimage/jayni.png'
import Image from 'next/image'
export default function CheckOutMember() {
  return (
    <div className='d-flex justify-content-between align-items-center'>
        <h4>Member Name</h4>
        <Image src={jayni} className='border rounded-circle w-25 h-100 border-2 border-warning' ></Image>
    </div>
  )
}
