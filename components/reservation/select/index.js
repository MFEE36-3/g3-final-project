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

    // let arrfoodtype = router.query.foodtype !== "" ? router.query.foodtype.split(',') : [];

    // 判斷router.query.foodtype是否有值
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

    const strcity = router.query.city;
    const arrdist = router.query.dist;


    const usp = new URLSearchParams();
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (strcity) {
      usp.set('city', strcity);
    }
    if (arrdist) {
      usp.set('dist', arrdist);
    }


    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString();

    // 修改 router.push 部分
    let url = '/reservation';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push(url);

  };


  return (
    <>
      <div className={style.selectarea}>
        <div>
          <Area keyword={keyword} setKeyword={setKeyword} />
        </div>
        <div>
          <CheckBox keyword={keyword} handleFoodtypes={handleFoodtypes} />
        </div>
        <div>
          <SliderBar keyword={keyword} setKeyword={setKeyword}/>
        </div>
      </div>
    </>
  );
}
