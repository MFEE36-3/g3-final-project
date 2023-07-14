import Area from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import SidebarBtn from './sidebarbtn';
import Btn from '@/components/common/btn';
import style from '@/styles/reservation/style.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SelectArea({ keyword, setKeyword }) {

  const router = useRouter();

  // console.log("router.query:", router.query)


  const initialtypes = [
    { id: 1, name: '中式', selected: false },
    { id: 2, name: '日式', selected: false },
    { id: 3, name: '美式', selected: false },
    { id: 4, name: '泰式', selected: false },
    { id: 5, name: '韓式', selected: false },
    { id: 6, name: '西式', selected: false },
  ];


  const handleFoodtypes = (id) => {
    setKeyword((prevFoodtypes) => ({
      ...prevFoodtypes, foodtype: prevFoodtypes.foodtype.map((id2) => {
        return id === id2.id ? { ...id2, selected: !id2.selected } : id2;
      })
    })

    );
  };


  return (
    <>
      <form className={style.selectarea} onSubmit={(e) => {
        e.preventDefault();

      }}>
        <div>
          <Area />
        </div>
        <div>
          <CheckBox keyword={keyword} handleFoodtypes={handleFoodtypes} />
        </div>
        <div>
          <SliderBar />
        </div>
        {/* <Btn text="go!" /> */}
      </form>
    </>
  );
}
