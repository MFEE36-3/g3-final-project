import React,{useContext, useEffect, useState} from 'react'
import CheckOutCounter from './CheckOutCounter'
import { Cart } from '@/components/checkout/CheckOutFinal'
import {HiOutlineTrash} from 'react-icons/hi'
import Swal from 'sweetalert2'
import emptycart from '@/public/trycheckoutimage/emptycart.png'
export default function CheckOutItem() {
    const {items, showPages, setItems, page} = useContext(Cart)
    const [localStorageItems, setLocalStorageItems] = useState({});
    const handleRemove = (removeItem) => {
      setLocalStorageItems({});
      Swal.fire({
        title: `<div style="font-family: Mochiy Pop One;">確定要刪除${removeItem.itemName}</div>`,
        html: '<div style="font-family: Mochiy Pop One;">刪除後需重新將商品加入購物車</div>',
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
          const subscribeItem = JSON.parse(localStorage.getItem("subscribe"));
          const buyItem = JSON.parse(localStorage.getItem("buy"));
          const orderItem = JSON.parse(localStorage.getItem("order"));
          const shopItem = JSON.parse(localStorage.getItem("shop"));
          const updatedShopItem = (shopItem !== null && shopItem !== undefined) ? Object.values(shopItem).filter(item => item[0] !== removeItem.itemId) :[]
          const updatedOrderItem = (orderItem !== null && orderItem !== undefined)? Object.values(orderItem).filter(item => item[0] !== removeItem.itemId) : []
          const updatedBuyItem = (buyItem !== null && buyItem !== undefined) ? Object.values(buyItem).filter(item => item[0] !== removeItem.itemId) : []
          const updatedSubscribeItem = (subscribeItem !== null && subscribeItem !== undefined) ? Object.values(subscribeItem).filter(item => item[0] !== removeItem.itemId) :[]
          if (updatedShopItem.length > 0) {
            localStorage.setItem("shop", JSON.stringify(Object.fromEntries(updatedShopItem)));
          }
          if (updatedOrderItem.length > 0) {
            localStorage.setItem("order", JSON.stringify(Object.fromEntries(updatedOrderItem)));
          }
          
          if (updatedBuyItem.length > 0) {
            localStorage.setItem("buy", JSON.stringify(Object.fromEntries(updatedBuyItem)));
          }
          
          if (updatedSubscribeItem.length > 0) {
            localStorage.setItem("subscribe", JSON.stringify(Object.fromEntries(updatedSubscribeItem)));
          }
          setLocalStorageItems({
            ...Object.fromEntries(updatedShopItem),
            ...Object.fromEntries(updatedOrderItem),
            ...Object.fromEntries(updatedBuyItem),
            ...Object.fromEntries(updatedSubscribeItem)
          })
          Swal.fire(
            '刪除成功!',
            `已將${removeItem.itemName}從購物車移除`,
            'success'
          )
        }
      });
    }
    useEffect(()=>{
        const subscribeItem = JSON.parse(localStorage.getItem("subscribe")) || {}
        const buyItem = JSON.parse(localStorage.getItem("buy")) || {}
        const orderItem = JSON.parse(localStorage.getItem("order")) || {}
        const shopItem = JSON.parse(localStorage.getItem("shop")) || {}
        if (orderItem !== undefined && Object.values(orderItem).length < 1) localStorage.removeItem('order');
        if (shopItem !== undefined && Object.values(shopItem).length < 1) localStorage.removeItem('shop');
        if (buyItem !== undefined && Object.values(buyItem).length < 1) localStorage.removeItem('buy');
        if (subscribeItem !== undefined && Object.values(subscribeItem).length < 1) localStorage.removeItem('subscribe');
    },[localStorageItems])
    const itemCart = (item) =>{
      const maxChars = 20;
      const shortItemName = item.itemName.length > maxChars ? item.itemName.substring(0, maxChars) + '...' : item.itemName;
      return (
        <div key={item.itemId} className='border rounded-3 d-flex mb-4 position-relative'  style={{ width: "95%", boxShadow: "4px 2px 5px -2px #7A7070" }}>
          <img src={item.src} alt={`${item.itemName}`} className='overflow-hidden object-fit-cover w-25 rounded-start-3' style={{height:"120px",}} ></img>
          <div className='d-flex align-items-center ms-3 w-100 justify-content-between'>
            <div className='w-25 me-5' style={{fontSize:"18px"}}>{shortItemName}</div>
            <div className='d-flex align-items-center justify-content-between' style={{width:"70%"}}>
              <div style={{fontSize:"20px"}} className='w-25'>{page === 'subscribe' ? <div></div> : `$${item.price}`}</div>
              {page === 'subscribe' ? <div></div>: <CheckOutCounter itemId={item.itemId} item={item} amount={item.amount}/>}
              <div className='me-5 text-danger fs-4' style={{width:"5%"}}>{`$${item.price*item.amount}`}</div>
              <HiOutlineTrash className='me-3 fs-1' style={{cursor:"pointer"}} onClick={() => handleRemove(item)}/>
            </div>
          </div>  
        </div>
      )
    }
    
  return (
    <>
      {showPages(items).length !== 0 ? (<div className='d-flex flex-column overflow-auto mt-2 me-2 position-relative' style={{ height: "76%" }}>
        {showPages(items).map(item=>(itemCart(item)))}
      </div>) : (<div className='d-flex flex-column mt-2 me-2 position-relative justify-content-center align-items-center' style={{ height: "76%" }}>
        <img src={emptycart.src} alt='empty' className='w-25 border-bottom border-3' style={{height:"22%"}}></img>
        <div className='fs-5 mt-2'>你的購物車空空如也</div>
      </div>)}
    </>
  );
}
