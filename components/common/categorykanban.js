import React from 'react';
import styles from './categorykanban.module.css';
export default function Categorykanban() {
  return (
    <>
    
        <div className={styles.container}>
          <div className={styles.avator}>
            <img></img>
          </div>
          <div className={styles.ptext}>小資美食版</div>
        </div>
        <div className={styles.end}>
        <input placeholder="搜尋" className={styles.put}></input>
    </div>
    </>
  );
}
