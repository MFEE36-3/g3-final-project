import React from 'react'
import style from '@/styles/reservation/style.module.css'

export default function ToggleButtonGroup({ page, setPage }) {

  const handlesetPage = (page) => {
    setPage(page)
  }

  return (
    <div>
      <button
        className={page === '訂位' ? style.toggleactive : ' '}
        onClick={() => {
          handlesetPage('訂位')
        }}>
        訂位
      </button>
      <button
        className={page === '外帶' ? style.toggleactive : ' '}
        onClick={() => {
          handlesetPage('外帶')
        }}>
        外帶
      </button>

    </div>
  )
}
