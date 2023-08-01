import React, { useContext } from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import { Cart } from '@/components/checkout/CheckOutFinal'
export default function CheckOutLeftHead() {
  const {page, items, showPages} = useContext(Cart)
  const handlePage = () => {
    switch (page){
      case 'subscribe':
          return "訂閱";
      case 'buy':
          return "買買";
      case 'order':
          return "訂位";
      default:
          return "商城";
  }
  }
  return (
    <div className='d-flex flex-column border-bottom border-1 border-dark-subtle border-opacity-50' style={{width:"95%"}}>
    <div>
        <BsArrowLeft className='me-2 fs-5'/> 
        <span>返回{handlePage()}</span>
      </div>
      <div className='d-flex justify-content-between mt-4 mb-2'>
        <div>
            <h4>您的{handlePage()}商品</h4>
            <p className='mb-0'>您的購物車有 {showPages(items).length} 項商品</p>
        </div>
    </div>
    </div>
  )
}
