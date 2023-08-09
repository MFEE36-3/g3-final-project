import React from 'react';
import MemBtn from './mem-Btn';

//把從最上層元件傳遞來的change再傳給Btn做為顯示文字
//點擊按鈕會觸發changeContent函式，把父層的布林值狀態改為true，從而重新渲染並顯示新的input
export default function MemInfoInputDefault({ change, changeContent }) {
  return (
    <>
      <MemBtn
        text={change}
        padding={'35px 10px'}
        fs="var(--h7)"
        onClick={changeContent}
      />
    </>
  );
}
