import React from 'react';
import Carousel from '@/components/reservation/topdiv/carousel';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SliderBar from '@/components/reservation/select/sliderbar';
import SelectArea from '@/components/reservation/select';
import ToggleButtonGroup from '@/components/reservation/main/switchbar';

export default function BookingPage() {
  return (
    <>
      <div className={style.body}>
        <div>
          <TopDiv />
        </div>
        <div className={style.dflex}>
          <SelectArea />
        </div>
      </div>
    </>
  );
}
