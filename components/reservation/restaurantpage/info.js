import React from 'react'
import Button from 'react-bootstrap/Button';
import { FaUtensils } from 'react-icons/fa6';
import style from '@/styles/reservation/style.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Info() {

    const router = useRouter();
    const [row, setRow] = useState({});

    useEffect(() => {
        if (router.query.sid) {
            fetch(process.env.API_SERVER + "/search/" + router.query.sid)
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) {
                        setRow(data.row);
                    } else {
                    }
                })
        };
    }, [router.query]);

    return (
        <>
            <div className={style.info}>
                <p className={style.restauranttitle}>{row?.shop}</p>
                <p>{row?.res_desc}</p>
                <div className={style.restaurantdetail}>
                    <div className='pb-2 d-flex'>
                        <div className={style.detailwidth}>地點</div>
                        <div>|{row?.cityname}{row?.areaname}{row?.location}</div>
                    </div>
                    {/* <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>營業時間</div>
                                <div>|{time}</div>
                            </div> */}
                    <div className='pb-2 d-flex'>
                        <div className={style.detailwidth}>人均消費</div>
                        <div>|${row?.avg_consumption}</div>
                    </div>
                    <div className='pb-2 d-flex'>
                        <div className={style.detailwidth}>電話</div>
                        <div>|0{row?.phone}</div>
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
                            {row?.res_cate}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
