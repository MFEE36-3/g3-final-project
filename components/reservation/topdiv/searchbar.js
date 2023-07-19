import style from '@/styles/reservation/style.module.css';
import { useState } from 'react';
import Search from '@/public/reservation/search.svg';
import Image from 'next/image';
import InputArea from '@/components/common/input';

export default function SearchBar() {

  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className={style.searchbar}>
        <Image src={Search} />
        <InputArea placeholder='請輸入餐廳' label=""
        />
      </div>
    </>
  );
}
