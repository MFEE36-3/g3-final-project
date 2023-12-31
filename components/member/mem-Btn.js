import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './mem-Btn.module.css';

export default function MemBtn({
  text = 'set text',
  padding = '15px 30px',
  fs = 'var(--h5)',
  onClick = () => {},
  ...props
}) {
  return (
    <>
      <Button
        className={styles.btn}
        sx={{
          '&& .MuiTouchRipple-child': { backgroundColor: '#911010' },
          padding: { padding },
          ...props.sx,
        }}
        onClick={onClick}
        value={text}
      >
        <div className={styles.btn_text} style={{ fontSize: fs }}>
          {text}
        </div>
      </Button>
    </>
  );
}
