import React from 'react'
import CheckOutLeftHead from './CheckOutLeftHead'
import CheckOutItem from './CheckOutItem'
export default function CheckOutLeft({page, items, setItems, amount, showPages, setAmount}) {
  return (
    <div className='col-7'  style={{fontFamily:"var(--ff2)"}}>
        <CheckOutLeftHead />
        <CheckOutItem />
    </div>
  )
}
