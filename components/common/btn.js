import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import styles from '@/styles/btn.module.css'


export default function Btn({ text = 'set text'}) {

  return (
    <>

      <Button className={styles.btn} sx={{'&& .MuiTouchRipple-child': {'backgroundColor': '#911010'}}}>
        <div className={styles.btn_text}>
          {text}
        </div>
      </Button>


    </>
  );
}


