import React from 'react';
import styles from './new_nav.module.css';
export default function Newnav() {
  return (
    <>
      <div className={styles.line}>
        <button className={styles.nav}>新聞區</button>
        <button className={styles.nav}>哈拉區</button>
        <button className={styles.nav}>文章列表</button>
      </div>
    </>
  );
}
