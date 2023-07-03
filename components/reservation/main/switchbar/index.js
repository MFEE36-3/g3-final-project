import React, { useState } from 'react'
import style from '@/styles/reservation/style.module.css'
import SwitchButton from './switchbutton'

export default function ToggleButtonGroup() {
  const [activeButton, setActiveButton] = useState(1)

  const orderType= [
    { id: 1, name: '訂位'},
    { id: 2, name: '外帶'},
  ]

const handleActive = (id)=>{
    setActiveButton(id)
}

  return (
    <div>
      {orderType.map((v) => {
        const { id, name } = v
        return (
          <SwitchButton key={id} id={id} name={name} activeButton={activeButton} handleActive={handleActive}/>
        )
      })}
    </div>
  )
}
