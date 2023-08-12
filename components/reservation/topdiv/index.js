import React from 'react';
import SearchBar from './searchbar';
import style from '@/styles/reservation/style.module.css';
import CarouselDiv from './carousel';
import { BiCategory } from "react-icons/bi";

export default function TopDiv({ keyword, setKeyword }) {
  return (
    <>
      <div className={style.topdiv}>
        <CarouselDiv />
        <div className={`${style.rwdsearchdiv} d-flex`}>
          <div>
            <BiCategory className={style.rwdselected} />
          </div>
          <SearchBar keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
    </>
  );
}
