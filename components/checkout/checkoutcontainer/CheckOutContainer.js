import React from 'react'
export default function CheckOutContainer(props) {
  return (
    <div className='m-3 border border-2  border-secondary-subtle mx-auto d-flex p-5 container rounded-5 position-relative' style={{height:"90vh"}}>
        {props.children}
    </div>
  )
}
