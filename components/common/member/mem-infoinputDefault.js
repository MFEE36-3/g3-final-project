import React from 'react';
import styles from './mem-infoInput.module.css';
import Btn from '../btn';
import { useState } from 'react';

export default function MemInfoInputDefault({ content, change }) {
  const [update, setUpdate] = useState(true);
  console.log(update);
  return (
    <>
      {update ? (
        <Btn
          text={change}
          padding={'35px 10px'}
          fs="var(--h7)"
          onClick={setUpdate(false)}
        />
      ) : (
        <>
          <Btn text="取消" padding={'35px 10px'} fs="var(--h7)" />
          <Btn text="確定" padding={'35px 10px'} fs="var(--h7)" />
        </>
      )}
    </>
  );
}
