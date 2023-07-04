import React, { useContext, useState } from 'react'
import { Cart } from '@/pages/checkout/CheckOut'
import Swal from 'sweetalert2'
export default function CheckOutCounter({itemId, amount}) {
    const {items, setItems, page} = useContext(Cart);
    const i = itemId;
    const p = page;
    const minus = (id) => {
        setItems(prev => {
            const updatedAmount = {...prev};
            const itemIndex = updatedAmount[p].findIndex(item => item.itemId === id);
            if (updatedAmount[p][itemIndex].amount > 1) {
                updatedAmount[p][itemIndex].amount -= 1;
              }
            return updatedAmount;
        })
    }
    const plus = (id) => {
        setItems(prev => {
            const updatedAmount = {...prev};
            const itemIndex = updatedAmount[p].findIndex(item => item.itemId === id);
            updatedAmount[p][itemIndex].amount += 1
            return updatedAmount;
        })
    }
    const deleteItemConfirm = (removeItem) => {
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
              setItems(prev => prev[page].filter(item => item.amount > 0))
              Swal.fire(
                '刪除成功!',
                `已將${removeItem.itemName}從購物車移除`,
                'success'
              )
            }
          });
    }
  return (
    <div className='d-flex justify-content-center align-items-center w-25' key={i} >
        <span onClick={()=>{
            minus(i)
            }}
        className='fs-3 ms-1' style={{ cursor: 'pointer' }}>-</span>
        <input type='text' value={amount} className='mx-1 w-25 border text-center rounded-2' onChange={()=>deleteItemConfirm} readOnly></input>
        <span onClick={()=>(plus(i))} className='fs-4 me-1' style={{ cursor: 'pointer' }}>+</span>
    </div>
  )
}
