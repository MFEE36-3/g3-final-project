import React from 'react'
import BlankLayout from '@/components/layout/blank-layout'
import AddCash from '@/components/checkout/addcash/addcash'
export default function AddCashPage() {
  return (
    <AddCash/>
  )
}

AddCashPage.getLayout = BlankLayout