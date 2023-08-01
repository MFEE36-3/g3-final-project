import React from 'react'
export default function CheckOutContainer(props) {
  return (
    <div className='m-3 border border-2 mx-auto d-flex p-5 container rounded-3 position-relative' style={{height:"85vh"}}>
        {props.children}
    </div>
  )
}
