import React from 'react'
import dayjs from 'dayjs';
import style from '@/styles/reservation/style.module.css'
import { areArraysEqual } from '@mui/base';

export default function DateTime({ date, setDate, time, setTime }) {

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
        console.log(selectedtime);
    }

    return (
        <>
            <div className={style.timerow}>
                {availabletime.map((v) => {
                    const { id, name } = v;
                    return (
                        <div className={time === name ? style.timeblockactive : style.timeblock} key={id} onClick={() => handleTime(name)}>
                            <div className={style.timetext}>{`${pickdate}`}</div>
                            <div className={style.timetext}>{name}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
