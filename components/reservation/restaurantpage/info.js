import React from 'react'
import Button from 'react-bootstrap/Button';
import { FaUtensils, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import { ImSpoonKnife } from 'react-icons/im';
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
                <p className={style.restaurantsubtitle}># {row?.res_desc}</p>
                <div className={style.restaurantdetail}>
                    <div className={style.infodetail}>
                        <FaLocationDot className={style.iconstyle} />
                        <div>{row?.cityname}{row?.areaname}{row?.location}</div>
                    </div>
                    {/* <div className='pb-2 d-flex'>
                                <div className={style.detailwidth}>營業時間</div>
                                <div>|{time}</div>
                            </div> */}
                    <div className={style.infodetail}>
                        <AiFillDollarCircle className={style.iconstyle} />
                        <div>$ {row?.avg_consumption} / per</div>
                    </div>
                    <div className={style.infodetail}>
                        <FaPhone className={style.iconstyle} />
                        <div>0{row?.phone}</div>
                    </div>
                    <div className={style.infodetail}>
                        <ImSpoonKnife className={style.iconstyle} />
                        <Button
                            style={{
                                fontSize: '14px',
                                background: '#911010',
                                borderRadius: 20,
                                border: 0,
                                color: 'white',
                                padding: '5px',

                            }}
                        >
                            <FaUtensils className={style.buttonicon} />
                            {row?.res_cate}
                        </Button>
                    </div>
                    <div className={style.infodetail}>
                        <iframe
                            className={style.map}
                            frameborder={0}
                            src={`https://www.google.com/maps/embed/v1/place?q=${row?.cityname}${row?.areaname}${row?.location}&key=AIzaSyAe4RAMJalQ2Zz12UpGV3RoLw6sLUIFvQ8`}
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}
