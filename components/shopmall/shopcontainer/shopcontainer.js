import React from 'react'

export default function ShopContainer(props) {
  return (
    <div className='container-fluid mt-5 h-100 px-xl-5 mb-5'>
      <div className='row'>
        {props.children}
      </div>
    </div>
  )
}
