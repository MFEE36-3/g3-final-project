import React from 'react'
import style from '@/styles/reservation/style.module.css'

export default function Info() {
    const information = [{
        id: 1,
        name: "星期五美式餐廳",
        time: "11:00~21:00",
        location: "台北市復興南路一段290號",
        peramount: 500,
        phone: "02-2299-8888",
        type: "美式"
    }]

    return (
        <>
            {information.map((v) => {
                const { id, name, time, location, peramount, phone, type } = v;
                return (
                    <div className={style.info}>
                        <p className={style.restauranttitle}>{name}</p>
                        <div className={style.restaurantdetail}>
                            <div className='pb-1'>
                                地點|{location}
                            </div>
                            <div className='pb-1'>
                                營業時間|{time}
                            </div>
                            <div className='pb-1'>
                                人均消費|${peramount}
                            </div>
                            <div className='pb-1'>
                                電話|{phone}
                            </div>
                            <div className='pb-1'>
                                餐廳類別|{type}
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}
