import React, { useState } from 'react'
import ToggleButtonGroup from './ToggleButtonGroup'
import Reservation from './reservation'
import Togo from './togo'

export default function ReservationPage({ row, date, setDate, time, setTime, person, setPerson, seat, setSeat }) {

    const [page, setPage] = useState('訂位')


    return (
        <>
            <div className='d-flex justify-content-center m-4'>
                <ToggleButtonGroup page={page} setPage={setPage} setDate={setDate} setTime={setTime} setPerson={setPerson} setSeat={setSeat} />
            </div>
            {page === '訂位' ? <Reservation row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} />
                : <Togo row={row} />}
        </>
    )
}
