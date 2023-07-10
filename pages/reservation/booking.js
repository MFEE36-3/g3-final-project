import React from 'react'
import style from '@/styles/reservation/style.module.css';
import Rcarousel from '@/components/reservation/reservationPage/carousel'
import Info from '@/components/reservation/reservationPage/info';
import ToggleButtonGroup from '@/components/reservation/reservationPage/switchbar';
import Reservation from '@/components/reservation/reservationPage/reservation';
import Togo from '@/components/reservation/reservationPage/togo';
import ReservationPage from '@/components/reservation/reservationPage';

export default function Booking() {
  return (
    <>
      <div className={style.body}>
        <Rcarousel />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Info />
            </div>
            <div className="col-9">
              <ReservationPage />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
