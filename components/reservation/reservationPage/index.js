import React, { useState } from 'react'
import ToggleButtonGroup from './switchbar'
import Reservation from './reservation'
import Togo from './togo'

export default function ReservationPage() {

    const [page, setPage] = useState('訂位')


    return (
        <>
            <div>
                <ToggleButtonGroup
                    page={page}
                    setPage={setPage} />
                {page === '訂位' ? <Reservation /> : <Togo />}
            </div>
        </>
    )
}
