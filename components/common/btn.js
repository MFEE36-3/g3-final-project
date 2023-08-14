import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import styles from '@/styles/btn.module.css';

export default function Btn({
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
          '&& .MuiTouchRipple-child': { backgroundColor: '#911010 !important' },
          padding: { padding },
          ...props.sx,
        }}
        onClick={onClick}
      >
        <div className={styles.btn_text} style={{ fontSize: fs }}>
          {text}
        </div>
      </Button>
    </>
  );
}
