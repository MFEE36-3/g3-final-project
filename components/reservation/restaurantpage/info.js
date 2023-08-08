import React from 'react'
import Button from 'react-bootstrap/Button';
import { FaUtensils, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { BiSolidTimeFive } from 'react-icons/bi';
import { BsCircleFill } from 'react-icons/bs';
import { AiFillDollarCircle } from 'react-icons/ai';
import { ImSpoonKnife } from 'react-icons/im';
import { GoDotFill } from 'react-icons/go';
import style from '@/styles/reservation/style.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RowingSharp } from '@mui/icons-material';
import dayjs from 'dayjs';
export default function Info({ row }) {

    const router = useRouter();
    const [isopen, setIsopen] = useState(false);

    useEffect(() => {
        // 確保 row 物件及其屬性不是 undefined，然後再處理日期和時間的分割
        if (row && row.detail?.open_time && row.detail?.close_time) {
            const nowtime = new Date();//['Thu Jul 27 2023 11', '28', '30 GMT+0800 (台北標準時間)']
            const timearr = nowtime.toString().split(':');
            const timearr1 = timearr[0].slice(-2);
            const timearr2 = timearr[1];
            const inttime = Number(timearr1 + timearr2);

            const opentime = parseInt(row.detail?.open_time.split(':').join(''));
            const closetime = parseInt(row.detail?.close_time.split(':').join(''));

            const today = dayjs().day(); // 取得現在是星期幾
            const dayOfWeekString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today];

            if (inttime >= opentime && inttime <= closetime && row.detail[dayOfWeekString] === 1) {
                setIsopen(true);
            }
        }
    }, [row]);


    return (
        <>
            <div className={style.info}>
                <p className={style.restauranttitle}>{row.detail?.shop}</p>
                <p className={style.restaurantsubtitle}># {row.detail?.res_desc}</p>
                <div className={style.restaurantdetail}>
                    <div className={style.infodetail}>
                        <FaLocationDot className={style.iconstyle} />
                        <div>{row.detail?.cityname}{row.detail?.areaname}{row.detail?.location}</div>
                    </div>
                    <div className={style.infodetail}>
                        <BiSolidTimeFive className={style.iconstyle} />
                        <div className='d-flex align-items-center'><BsCircleFill className={`${isopen ? style.openstyle : style.closestyle} me-2`} />
                            <span className={`${isopen ? style.openstyle : style.closestyle} me-2`}>{isopen ? '營業中' : '已打烊'}</span>{row.detail?.open_time} - {row.detail?.close_time}</div>
                    </div>
                    <div className={style.infodetail}>
                        <AiFillDollarCircle className={style.iconstyle} />
                        <div>$ {row.detail?.avg_consumption} / per</div>
                    </div>
                    <div className={style.infodetail}>
                        <FaPhone className={style.iconstyle} />
                        <div>0{row.detail?.phone}</div>
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
                            {row.detail?.res_cate}
                        </Button>
                    </div>
                    <div className={style.infodetail}>
                        <iframe
                            className={style.map}
                            frameBorder={0}
                            // src={`https://www.google.com/maps/embed/v1/place?q=${row?.cityname}${row?.areaname}${row?.location}&key=`}
                            src={`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${Number(row.detail?.latitude)},${Number(row.detail?.longitude)}&z=16&output=embed&t=`}
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}
