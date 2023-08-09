import React from 'react'
import CheckOutFinal from '@/components/checkout/CheckOutFinal'
import BlankLayout from '@/components/layout/blank-layout'
import Head from 'next/head';
export default function Checkout() {
  return (
    <>
      <Head>
          <title>食GOEAT! / 結帳</title>
      </Head>
      <CheckOutFinal/>
    </>
    
  )
}

Checkout.getLayout = BlankLayout