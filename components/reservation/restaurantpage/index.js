import React, { useState } from 'react'
import ToggleButtonGroup from './switchbar'
import Reservation from './reservation'
import Togo from './togo'

export default function ReservationPage({ date, setDate, time, setTime, person, setPerson, seat, setSeat }) {

    const [page, setPage] = useState('訂位')


    return (
        <>
            <div className='d-flex justify-content-center m-4'>
                <ToggleButtonGroup
                    page={page}
                    setPage={setPage} />
            </div>
            {page === '訂位' ? <Reservation date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} />
                : <Togo />}
        </>
    )
}
