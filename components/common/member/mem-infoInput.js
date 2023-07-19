import styles from './mem-infoInput.module.css';
import Btn from '../btn';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MemInfoInputDefault from './mem-infoinputDefault';

export default function MemInfoInput({ tag, content, change }) {
  const router = useRouter();

  const [info, setInfo] = useState(content);

  //點擊修改資料觸發的函式
  // const updateContent = () => {
  //   setUpdate(changeInput);
  // };

  //點擊取消修改觸發的函式
  const cancel = () => {
    // setUpdate(defaultInput);
  };

  //點擊確認送出觸發的函式
  const sendInfo = () => {
    fetch('...', { method: 'PUT' });
  };

  //把此元件要呈現的input欄位先放在這個變數裡面
  // const defaultInput = (
  //   <div key={'defaultInput'} className={styles.listcontent}>
  //     <input className={styles.listinput} value={content} readOnly />
  //     {change && (
  //       <Btn
  //         text={change}
  //         padding={'35px 10px'}
  //         fs="var(--h7)"
  //         // onClick={updateContent}
  //       />
  //     )}
  //   </div>
  // );

  //決定按鈕點擊後會出現哪些資料用的

  //點擊修改資料後會呈現的內容
  // const changeInput = (
  // <div key={'changeInput'} className={styles.listcontent2}>
  //   <input
  //     className={styles.listinput}
  //     value={info}
  //     onChange={(e) => {
  //       console.log(e.target.value);

  //       setInfo(e.target.value);
  //     }}
  //     // onFocus={(e) => {
  //     //   console.log(e.target.value);
  //     // }}
  //   />
  //   <Btn text="取消" padding={'35px 10px'} fs="var(--h7)" onClick={cancel} />
  //   <Btn
  //     text="確定"
  //     padding={'35px 10px'}
  //     fs="var(--h7)"
  //     onClick={sendInfo}
  //   />
  // </div>
  // );

  return (
    <div className={styles.listflex}>
      <div className={styles.listtag}>● {tag}</div>
      <div key={'changeInput'} className={styles.listcontent}>
        <input
          className={styles.listinput}
          value={info}
          onChange={(e) => {
            console.log(e.target.value);

            setInfo(e.target.value);
          }}
          // onFocus={(e) => {
          //   console.log(e.target.value);
          // }}
        />
        {change ? <MemInfoInputDefault change={change} /> : <></>}
      </div>
    </div>
  );
}
