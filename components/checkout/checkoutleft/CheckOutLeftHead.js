import React, { useCallback, useContext, useEffect, useState } from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import { Cart } from '@/components/checkout/CheckOutFinal'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function CheckOutLeftHead() {
  const {page, items, showPages} = useContext(Cart)
  const router = useRouter()
  const [url, setUrl] = useState('')
  const handlePage = () => {
    switch (page){
      case 'subscribe':
          return "會員";
      case 'buy':
          return "順路買買";
      case 'order':
          return "訂位/外帶";
      default:
          return "美食商城";
  }

  }
  useEffect(()=>{
    switch (page) {
      case 'subscribe' :
        setUrl('http://localhost:3000/member')
        break
      case 'buy' :
        setUrl('http://localhost:3000/buyforme')
        break 
      case 'order' :
        setUrl('http://localhost:3000/reservation')
        break
      case 'shop' :
        setUrl('http://localhost:3000/shopmall')
        break
      default:
        setUrl(''); 
        break;
    }
  },[page])
  return (
    <div className='d-flex flex-column border-bottom border-1 border-dark-subtle border-opacity-50' style={{width:"95%"}}>
      <div style={{cursor:"pointer"}} className='d-flex align-items-center'>
        <BsArrowLeft  className='me-2 fs-5'/> 
        <Link href={url}>返回{handlePage()}</Link>
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
