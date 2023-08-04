import React, { useCallback, useContext, useState } from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import { styled } from 'styled-components';
     const Cusinput = styled.input`
    background:transparent;
    &:focus{
        outline:none
    }
    `
export default function CheckOutCounter({itemId, amount}) {
    const {setItems, page} = useContext(Cart);
    const i = itemId;
    const p = page;
    const minus = useCallback((id) => {
        setItems(prev => {
            const updatedAmount = {...prev};
            const itemIndex = updatedAmount[p].findIndex(item => item.itemId === id);
            if (updatedAmount[p][itemIndex].amount > 1) {
                updatedAmount[p][itemIndex].amount -= 1;
              }
            return updatedAmount;
        })
    },[])
    const plus = useCallback((id) => {
        setItems(prev => {
            const updatedAmount = {...prev};
            const itemIndex = updatedAmount[p].findIndex(item => item.itemId === id);
            updatedAmount[p][itemIndex].amount += 1
            return updatedAmount;
        })
    },[])
  return (
    <div className='d-flex justify-content-center align-items-center w-25' key={i} >
        <span onClick={()=>{
            minus(i)
            }}
        className='fs-2 me-1' style={{ cursor: 'pointer' }}>-</span>
        <Cusinput type='text' value={amount} className='mx-2 w-50 border-0 text-center fs-4 rounded-2 text-' onChange={()=>{}} readOnly></Cusinput>
        <span onClick={()=>(plus(i))} className='fs-3 ms-1' style={{ cursor: 'pointer' }}>+</span>
    </div>
  )
}
