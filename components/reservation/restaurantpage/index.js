import React, { useState } from 'react'
import ToggleButtonGroup from './ToggleButtonGroup'
import Reservation from './reservation'
import Togo from './togo'


export default function ReservationPage({ row, date, setDate, time, setTime, person, setPerson, seat, setSeat, memo, setMemo, shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime, item, setItem }) {

    const [page, setPage] = useState('訂位');

    return (
        <>
            <div className='position-relative'>
                <div className='d-flex justify-content-center m-4'>
                    <ToggleButtonGroup page={page} setPage={setPage} setDate={setDate} setTime={setTime} setPerson={setPerson} setSeat={setSeat} setTogodate={setTogodate} setTogotime={setTogotime} />
                </div>
                {page === '訂位' ? <Reservation row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} memo={memo} setMemo={setMemo} item={item} setItem={setItem} />
                    : <Togo row={row} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} togodate={togodate} setTogodate={setTogodate} togotime={togotime} setTogotime={setTogotime} item={item} setItem={setItem} />}
            </div>
        </>
    )
}
