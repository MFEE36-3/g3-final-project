import style from '@/styles/reservation/style.module.css';
import { useState } from 'react';
import Search from '@/public/reservation/search.svg';
import Image from 'next/image';

export default function SearchBar() {

  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className={style.searchbar}>
        <Image src={Search} />
        <input
          type="text"
          // value={inputText}
          className={style.searchinput}
          placeholder="請輸入餐廳名稱"
        />

      </div>
    </>
  );
}
