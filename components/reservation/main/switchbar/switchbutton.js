import React from 'react'
import style from '@/styles/reservation/style.module.css'

export default function SwitchButton({id,name,activeButton,handleActive}) {
  return (
    <button key={id} id={id} className={activeButton===id ? style.toggleactive:' '}
          onClick={()=>{
            handleActive(id)
          }}>
            {name}
          </button>
  )
}
