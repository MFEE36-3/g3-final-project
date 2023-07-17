import Area from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import Btn from '@/components/common/btn';
import style from '@/styles/reservation/style.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SelectArea({ keyword, setKeyword }) {

  const router = useRouter();

  const handleFoodtypes = (name) => {

    // setKeyword((prevFoodtypes) => (
    //   {...prevFoodtypes, foodtype: prevFoodtypes.foodtype.map((id2) => {
    //     return id === id2.id ? { ...id2, selected: !id2.selected } : id2;
    //   })
    // }));
    // const strfoodtype = keyword.foodtype.filter((v) => v.selected).map((v) => v.name).join(',');

    // let arrfoodtype = router.query.foodtype !== "" ? router.query.foodtype.split(',') : [];

    let arrfoodtype = [];

    if (router.query.foodtype && router.query.foodtype !== " ") {
     arrfoodtype = router.query.foodtype.split(',');
    } 

    if (arrfoodtype.includes(name)) {
      arrfoodtype = router.query.foodtype.split(',').filter(v => {
        if (v === name) return;
        return v;
      });
    }
    else {
      arrfoodtype.push(name);
    }

    const strfoodtype = arrfoodtype.join();

    router.push( strfoodtype ? `/reservation?foodtype=${strfoodtype}`: `/reservation`);

  };




  return (
    <>
      <div className={style.selectarea}>
        <div>
          <Area keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div>
          <CheckBox keyword={keyword} handleFoodtypes={handleFoodtypes} />
        </div>
        <div>
          <SliderBar />
        </div>
      </div>
    </>
  );
}
