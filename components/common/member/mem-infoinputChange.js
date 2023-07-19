import React from 'react';
import styles from './mem-infoInput.module.css';
import Btn from '../btn';
import { useState } from 'react';

export default function MemInfoinputChange(info, setInfo) {
  return (
    <div key={'changeInput'} className={styles.listcontent2}>
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
      <Btn text="取消" padding={'35px 10px'} fs="var(--h7)" />
      <Btn text="確定" padding={'35px 10px'} fs="var(--h7)" />
    </div>
  );
}
