import React from 'react'
import FinishCheckout from '@/components/checkout/finishcheckout/finishcheckout'
import BlankLayout from '@/components/layout/blank-layout'
export default function index() {
  return (
    <FinishCheckout/>
  )
}
index.getLayout = BlankLayout