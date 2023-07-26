import React, { useState } from 'react'
import ToggleButtonGroup from './switchbar'
import Reservation from './reservation'
import Togo from './togo'

export default function ReservationPage({ date, setDate }) {

    const [page, setPage] = useState('訂位')


    return (
        <>
            <div className='d-flex justify-content-center m-4'>
                <ToggleButtonGroup
                    page={page}
                    setPage={setPage} />
            </div>
            {page === '訂位' ? <Reservation date={date} setDate={setDate} /> : <Togo />}
        </>
    )
}
