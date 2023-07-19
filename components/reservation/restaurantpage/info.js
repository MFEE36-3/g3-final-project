import React from 'react'
import Button from 'react-bootstrap/Button';
import { FaUtensils } from 'react-icons/fa6';
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
                            <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>地點</div>
                                <div>|{location}</div>
                            </div>
                            <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>營業時間</div>
                                <div>|{time}</div>
                            </div>
                            <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>人均消費</div>
                                <div>|${peramount}</div>
                            </div>
                            <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>電話</div>
                                <div>|{phone}</div>
                            </div>
                            <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>餐廳類別</div>
                                |<Button
                                    style={{
                                        fontSize: '12px',
                                        background: '#911010',
                                        borderRadius: 20,
                                        border: 0,
                                        color: 'white',
                                        padding: '5px',
                                    }}
                                >
                                    <FaUtensils />
                                    {type}
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}
