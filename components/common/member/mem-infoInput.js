import styles from './mem-infoInput.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MemInfoInputDefault from './mem-infoinputDefault';
import MemInfoInputChange from './mem-infoinputChange';

export default function MemInfoInput({ tag, content, change, sid, title }) {
  const router = useRouter();

  //把預設顯示的資料放在狀態變數，方便後續修改
  const [info, setInfo] = useState(content);

  //創建一個布林值狀態變數，方便後續修改狀態
  const [update, setUpdate] = useState(false);

  //點擊「取消」按鈕時執行此函式，把布林值改回預設的false，input欄位的資料回復到預設狀態
  function cancel() {
    setUpdate(false);
    setInfo(content);
  }

  //點擊「確定」按鈕後送資料到後端觸發的函式，送完資料把布林值改回預設的false
  function sendInfo() {
    const data = { info, sid, title };
    console.log(JSON.stringify(data));

    fetch('http://localhost:3002/member', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUpdate(false);
  }

  // 預設資料會包含一個按鈕，點擊後會觸發此函式，把布林值改為true
  function changeContent() {
    setUpdate(true);
  }

  //布林值用來判斷樣式與onChange事件發生的時機
  //45行.預設false時是紅色邊框，點擊「修改」按鈕變成true時是橘色邊框
  //50行.當內容改變時的狀態是true，把顯示的資料修改為target.value
  //56行.有傳入change再生成後面的按鈕
  //57行.布林值是預設false時，生成預設的「修改」按鈕
  //點擊「修改」按鈕後，布林值改為true，生成第二種「取消」「確定」按鈕
  return (
    <div className={styles.listflex}>
      <div className={styles.listtag}>● {tag}</div>
      <div
        key={'changeInput'}
        className={update ? styles.listcontent2 : styles.listcontent}
      >
        <input
          className={styles.listinput}
          value={info}
          onChange={(e) => {
            if (update) {
              setInfo(e.target.value);
            }
          }}
        />
        {change ? (
          update ? (
            <MemInfoInputChange cancel={cancel} sendInfo={sendInfo} />
          ) : (
            <MemInfoInputDefault
              change={change}
              changeContent={changeContent}
            />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
