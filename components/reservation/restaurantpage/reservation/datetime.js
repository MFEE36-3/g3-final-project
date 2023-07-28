import React from 'react'
import dayjs from 'dayjs';
import style from '@/styles/reservation/style.module.css'
import { areArraysEqual } from '@mui/base';
import { useEffect } from 'react';

export default function DateTime({ row, date, time, setTime, setPerson, setSeat }) {

    // console.log(row.booking)
    // console.log(date)

    const pickdate = dayjs(date).format('M月D日');
    const availabletime = [
        { id: 1, name: "11:00" },
        { id: 2, name: "12:00" },
        { id: 3, name: "13:00" },
        { id: 4, name: "18:00" },
        { id: 5, name: "19:00" },
        { id: 6, name: "20:00" },
    ];

    const handleTime = (selectedtime) => {
        setTime(selectedtime)
        setPerson('');
        setSeat('');
    }

    //取得當日訂位時間資料
    const bookingdate = row?.booking?.map((v) => {
        return v.booking_date;
    })

    return (
        <>
            <div className={style.timerow}>
                {availabletime.map((v) => {
                    const { id, name } = v;

                    const isDisabled = row.booking?.filter((v) => v.booking_date.split('T')[0] === date && v.booking_time === name).length >= 15; // 判断是否禁用按钮

                    return (
                        <button className={time === name ? style.timeblockactive : style.timeblock} key={id}
                            onClick={() => handleTime(name)}
                            disabled={isDisabled}
                        >
                            <div className={style.timetext}>{`${pickdate}`}</div>
                            <div className={style.timetext}>{name}</div>
                        </button>
                    )
                })}
            </div>
        </>
    )
}
