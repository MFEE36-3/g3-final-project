import React from 'react';
import Carousel from '@/components/reservation/topdiv/carousel';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SliderBar from '@/components/reservation/select/sliderbar';
import SelectArea from '@/components/reservation/select';
import ToggleButtonGroup from '@/components/reservation/main/switchbar';
import FoodCard from '@/components/reservation/main/card';

export default function BookingPage() {
  return (
    <>
      <div className={style.body}>
        <TopDiv />
        <div className='container-fluid'>
          <div className="row">
            <div className='col-3' ><SelectArea /></div>
  
            <div className='col-9'><FoodCard /></div>
          </div>
        </div>
      </div>
    </>
  );
}
