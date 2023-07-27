import React from 'react'
import style from '@/styles/reservation/style.module.css'
import { FaUtensils } from 'react-icons/fa6';

export default function ToggleButtonGroup({ page, setPage, setDate }) {

  const handlesetPage = (page) => {
    setPage(page)
    setDate(); // 清除date的state避免畫面切換殘留發生錯誤
  }

  return (
    <div className='d-flex'>
      <div className={style.togglediv}>

        <div
          className={page === '訂位' ? style.toggleactive1 : style.togglebutton}
          onClick={() => {
            handlesetPage('訂位')
          }}>
          <FaUtensils className="me-1" />
          訂位
        </div>

        <div
          className={page === '外帶' ? style.toggleactive2 : style.togglebutton}
          onClick={() => {
            handlesetPage('外帶')
          }}>
          <FaUtensils className="me-1" />
          外帶
        </div>

      </div>
    </div>
  )
}
