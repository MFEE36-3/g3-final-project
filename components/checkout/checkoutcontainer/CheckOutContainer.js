import React from 'react'
export default function CheckOutContainer(props) {
  return (
    <div className='mt-3 border border-2  border-secondary-subtle mx-auto d-flex p-4 container rounded-5 position-relative'>
        {props.children}
    </div>
  )
}
