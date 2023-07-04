import React from 'react';
import styles from '@/styles/member-css/mem-package.module.css';

export default function MemPack() {
  const packageFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  const packageMoney = {
    marginTop: '20px',
    fontSize: '36px',
    fontWeight: '900',
  };

  const packageBtn = {
    width: '60px',
    borderRadius: '8px',
    fontWeight: '800',
    padding: '5px',
    color: 'white',
    backgroundColor: 'rgba(120, 120, 120, 1)',
    border: 'none',
  };

  return (
    <div className={styles.pack}>
      <div style={packageFlex}>
        <div>我的錢包</div>
        <div>帳號:asiagodtone@gmail.com</div>
      </div>

      <div style={packageMoney}>NT$ 7414</div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button style={packageBtn}>儲值+</button>
      </div>
    </div>
  );
}
