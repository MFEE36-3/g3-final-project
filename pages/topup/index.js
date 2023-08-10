import React from 'react'
import BlankLayout from '@/components/layout/blank-layout'
import AddCash from '@/components/checkout/topup/topup'
import Head from 'next/head';
export default function AddCashPage() {
  return (
    <>
        <Head>
            <title>食GOEAT! / 儲值</title>
        </Head>
      <AddCash/>
    </>
    
  )
}

AddCashPage.getLayout = BlankLayout