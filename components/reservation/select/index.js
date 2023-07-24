import Area from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import Star from './star';
import style from '@/styles/reservation/style.module.css';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

export default function SelectArea({ keyword, setKeyword }) {
  const router = useRouter();
  const handleFoodtypes = (name) => {

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
    const slideval = router.query.price;
    const numstar = router.query.star;
    const searchkeyword = router.query.searchkeyword;

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
    if (slideval) {
      usp.set('price', slideval);
    }
    if (numstar) {
      usp.set('star', numstar);
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString();

    // 修改 router.push 部分
    let url = '';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push({
      pathname: router.pathname,
      search: url
    }, undefined, { scroll: false });

  };

  let clearurl = '';
  // router.push('/reservation');
  const clearselect = () => {
    router.push(
      {
        pathname: router.pathname,
        search: clearurl
      }, undefined, { scroll: false })
  }

  return (
    <>
      <div className={style.selectarea}>
        <div className='w-100 mb-3'>
          <button className={style.clearselect} onClick={clearselect}>清除篩選</button>
        </div>
        <div>
          <Area keyword={keyword} setKeyword={setKeyword} />
        </div>
        <div>
          <CheckBox keyword={keyword} handleFoodtypes={handleFoodtypes} />
        </div>
        <div>
          <SliderBar keyword={keyword} setKeyword={setKeyword} />
        </div>
        <div>
          <Star keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
    </>
  );
}
