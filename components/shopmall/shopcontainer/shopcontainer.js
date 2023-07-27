import React from 'react'

export default function ShopContainer(props) {
  return (
    <div className='container-fulid mt-5 mx-5 h-100'>
      <div className='row'>
        {props.children}
      </div>
    </div>
  )
}