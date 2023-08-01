import React from 'react'


export default function CardContainer(props) {
  return (
    <div className='bg-light rounded-5 px-5  border position-relative d-flex flex-column justify-content-evenly' style={{height:"100%" , boxShadow:"4px 2px 5px -2px #7A7070"}}>
        {props.children}
    </div>
  )
}
