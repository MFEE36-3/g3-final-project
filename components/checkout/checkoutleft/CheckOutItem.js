import React,{useContext, useState} from 'react'
import CheckOutCounter from './CheckOutCounter'
import { Cart } from '@/components/checkout/checkoutfinal'
import {HiOutlineTrash} from 'react-icons/hi'
import Swal from 'sweetalert2'
import emptycart from '@/public/trycheckoutimage/emptycart.png'
import Image from 'next/image'
export default function CheckOutItem() {
    const {items, showPages, setItems, page} = useContext(Cart)
    const handleRemove = (removeItem) => {
      Swal.fire({
        title: `確定要刪除${removeItem.itemName}`,
        text: "刪除後需重新將商品加入購物車",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          setItems(prev =>{
            const readyDeleteIndex = prev[page].findIndex(item => item.itemId === removeItem.itemId);
            prev[page].splice(readyDeleteIndex,1)
            return {...prev}
          } )
          Swal.fire(
            '刪除成功!',
            `已將${removeItem.itemName}從購物車移除`,
            'success'
          )
        }
      });
    }
    const itemCart = (item) =>
    <div key={item.itemId} className='border rounded-3 d-flex p-2 mb-4 position-relative'  style={{ width: "95%", boxShadow: "4px 2px 5px -2px #7A7070" }}>
      <Image src={item.src} alt={`${item.itemName}`} className='overflow-hidden object-fit-cover w-25' style={{height:"100%",}} ></Image>
      <div className='d-flex align-items-center ms-3 w-100 justify-content-between'>
        <div>{item.itemName}</div>
        <div className='d-flex align-items-center justify-content-between' style={{width:"70%"}}>
          <div>{`$${item.price}`}</div>
          <CheckOutCounter itemId={item.itemId} item={item} amount={item.amount}/>
          <div className='me-5' style={{width:"5%"}}>{`$${item.price*item.amount}`}</div>
          <HiOutlineTrash className='me-3 fs-2' onClick={() => handleRemove(item)}/>
        </div>
      </div>
    </div>

  return (
    <>
      {showPages(items).length !== 0 ? (<div className='d-flex flex-column overflow-auto mt-2 me-2 position-relative' style={{ height: "76%" }}>
        {showPages(items).map(item=>(itemCart(item)))}
      </div>) : (<div className='d-flex flex-column mt-2 me-2 position-relative justify-content-center align-items-center' style={{ height: "76%" }}>
        <Image src={emptycart} className='w-25 border-bottom border-3' style={{height:"29%"}}></Image>
        <div className='fs-5 mt-2'>你的購物車空空如也</div>
      </div>)}
    </>
  );
}