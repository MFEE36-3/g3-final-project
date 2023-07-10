import React from 'react'
import pika from '@/public/trycheckoutimage/pika.jpg'
import hogeda from '@/public/trycheckoutimage/hogeda.png'
import jayni from '@/public/trycheckoutimage/jayni.png'
import miuha from '@/public/trycheckoutimage/miuha.png'
import cookie from '@/public/trycheckoutimage/cookie.png'
import cola from '@/public/trycheckoutimage/cola.webp'
import onion from '@/public/trycheckoutimage/onion.jpeg'
import jerky from '@/public/trycheckoutimage/jerky.webp'
import bala from '@/public/trycheckoutimage/bala.jpeg'
import veg from '@/public/trycheckoutimage/veg.jpeg'
import Image from 'next/image'
export default function ShopHead() {
  return (
    <>
      <div className='row d-flex justify-content-center h-100 mx-5 '>
        <Image src={veg} className='col-3 h-100 ps-0 pe-1 rounded-3'/>
        <Image src={jerky} className='col-3 h-100 ps-0 pe-1 rounded-3'/>
        <Image src={onion} className='col-3 h-100 ps-0 pe-1 rounded-3'/>
        <Image src={bala} className='col-3 h-100 px-0 rounded-3'/>

      </div>
    </>
  )
}
