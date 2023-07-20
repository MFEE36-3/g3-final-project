import React from 'react';
import SearchBar from './searchbar';
import style from '@/styles/reservation/style.module.css';
import CarouselDiv from './carousel';

export default function TopDiv({keyword,setKeyword}) {
  return (
    <>
      <div className={style.topdiv}>
        <CarouselDiv />
        <SearchBar keyword={keyword} setKeyword={setKeyword}/>
      </div>
    </>
  );
}
