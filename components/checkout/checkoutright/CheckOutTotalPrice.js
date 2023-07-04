import React, { useContext } from 'react'
import { Cart } from '@/pages/checkout/CheckOut'
import Button from '@mui/material/Button';
export default function CheckOutTotalPrice() {
    const {page, items, showPages} = useContext(Cart)
        const pagePrice = () => {
        // return showPages(items).map(item => item.price*item.amount).reduce((p ,c) => p + c)
        return showPages(items).length > 0 ? showPages(items).map(item => item.price * item.amount).reduce((p ,c) => p + c) : 0
    }
        const fee = 60
  return (
    <>
        <div className='mt-3 mx-1'>
            <div className='d-flex justify-content-between'>
                <span>商品價格</span>
                <span>${pagePrice()}</span>
            </div>
            <div className='d-flex justify-content-between mt-2'>
                <span>運費/外送費</span>
                <span>${showPages(items).length > 0 ? fee : 0}</span>
            </div>
            <div className='d-flex justify-content-between mt-2'>
                <span>總金額</span>
                <span>${pagePrice()+ (showPages(items).length > 0 ? fee : 0)}</span>
            </div>
        </div>
        <Button variant="contained" className='w-100 d-flex align-items-center mx-auto p-1 bg-warning rounded-4 mt-3 border-0 justify-content-center fs-4'>結&nbsp;&nbsp;&nbsp;&nbsp;帳</Button>
    </>
  )
}
