import React from 'react'
export default function ShopBody(props) {
  return (
    <div className='row d-flex mx-5 mt-5'>
    {props.children}
    </div>
  )
}
