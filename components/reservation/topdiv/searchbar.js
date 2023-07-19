import style from '@/styles/reservation/style.module.css';
import { useState } from 'react';
import Search from '@/public/reservation/search.svg';
import CloseButton from '@/public/reservation/closebutton.svg';
import Image from 'next/image';
import InputArea from '@/components/common/input';

export default function SearchBar() {

  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className={style.searchbar}>
        <Image src={Search} />
        <input type="text" placeholder='請輸入餐廳 ...' className={style.searchinput}></input>
        <Image src={CloseButton} />
      </div>
    </>
  );
}
