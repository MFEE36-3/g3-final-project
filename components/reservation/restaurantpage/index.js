import React, { useState } from 'react'
import ToggleButtonGroup from './ToggleButtonGroup'
import Reservation from './reservation'
import style from '@/styles/reservation/style.module.css'
import Togo from './togo'


export default function ReservationPage({ row, date, setDate, time, setTime, person, setPerson, seat, setSeat, memo, setMemo }) {

    const [page, setPage] = useState('訂位');

    return (
        <>
            <div className='position-relative'>
                <div className='d-flex justify-content-center m-4'>
                    <ToggleButtonGroup page={page} setPage={setPage} setDate={setDate} setTime={setTime} setPerson={setPerson} setSeat={setSeat} />
                </div>
                {page === '訂位' ? <Reservation row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} memo={memo} setMemo={setMemo} />
                    : <Togo row={row} />}
            </div>
        </>
    )
}
