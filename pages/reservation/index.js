import React from 'react';
import Carousel from '@/components/reservation/topdiv/carousel';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SliderBar from '@/components/reservation/select/sliderbar';
import SelectArea from '@/components/reservation/select';
import ToggleButtonGroup from '@/components/reservation/reservationPage/switchbar';
import Main from '@/components/reservation/main';

export default function BookingPage() {
  return (
    <>
      <div className={style.body}>
        <TopDiv />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SelectArea />
            </div>
            <div className="col-10">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
