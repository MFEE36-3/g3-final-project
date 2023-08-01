import style from '@/styles/reservation/style.module.css';
import { useState } from 'react';
import Search from '@/public/reservation/search.svg';
import CloseButton from '@/public/reservation/closebutton.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SearchBar({ keyword, setKeyword }) {
  const router = useRouter();


  const handleInputText = (e) => {
    const searchkeyword = e.target.value;
    setKeyword({ ...keyword, searchkeyword: searchkeyword })
  }

  const clearInput = () => {
    setKeyword({ ...keyword, searchkeyword: '' })
    
    const strcity = router.query.city;
    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();

    const arrdist = router.query.dist;
    const slideval = router.query.price;

    const usp = new URLSearchParams();

    if (strcity) {
      usp.set('city', strcity);
    }
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (arrdist) {
      usp.set('dist', arrdist);
    }
    if (slideval) {
      usp.set('price', slideval);
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

  }

  const handleInputTextURL = (e) => {
    if (e.key === 'Enter') {
      const searchkeyword = keyword.searchkeyword;

      const strcity = router.query.city;
      const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
      const strfoodtype = arrfoodtype.join();

      const arrdist = router.query.dist;
      const slideval = router.query.price;
      const numstar = router.query.star;

      const usp = new URLSearchParams();

      if (strcity) {
        usp.set('city', strcity);
      }
      if (strfoodtype) {
        usp.set('foodtype', strfoodtype);
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
    }
  }

  return (
    <>
      <div className={style.searchbar}>
        <Image src={Search} />
        <input type="text" value={keyword.searchkeyword} placeholder='請輸入餐廳 ...' className={style.searchinput}
          onChange={handleInputText} onKeyUp={handleInputTextURL}></input>
        <Image src={CloseButton} onClick={clearInput} />
      </div>
    </>
  );
}
