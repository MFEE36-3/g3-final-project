import React from 'react'
import CheckOutFinal from '@/components/checkout/CheckOutFinal'
import BlankLayout from '@/components/layout/blank-layout'
export default function Checkout() {
  return (
    <CheckOutFinal/>
  )
}

Checkout.getLayout = BlankLayout