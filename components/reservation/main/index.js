import React from 'react';
import Top5 from './top5';
import MainContent from './maincontent';
import { useRouter } from 'next/router';
import ResultContent from './resultcontent';

export default function Main({ keyword, setKeyword ,favorite,setFavorite }) {

  const router = useRouter();
  console.log(router)
  return (
    <>
      {/* 判斷router.query來決定顯示的內容 */}
      {Object.keys(router.query).length === 0 ?
        (<div >
          <Top5/>
          <MainContent favorite={favorite} setFavorite={setFavorite}/>
        </div>)
        : (
          <ResultContent favorite={favorite} setFavorite={setFavorite}/>)
      }
    </>
  );
}
