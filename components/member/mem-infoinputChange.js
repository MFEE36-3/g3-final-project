import React from 'react';
import MemBtn from './mem-Btn';

//點擊「取消」按鈕會執行cancel函式，把布林值改回預設的false，input欄位的資料回復到預設狀態
//點擊「確定」按鈕會執行sendInfo函式，送資料到後端，接著把布林值改回預設的false
export default function MemInfoinputChange({ cancel, sendInfo }) {
  return (
    <>
      <MemBtn
        text="取消"
        padding={'35px 10px'}
        fs="var(--h7)"
        onClick={cancel}
      />
      <MemBtn
        text="確定"
        padding={'35px 10px'}
        fs="var(--h7)"
        onClick={sendInfo}
      />
    </>
  );
}
