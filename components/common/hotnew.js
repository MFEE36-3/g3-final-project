import React from 'react';
import styles from './hotnew.module.css';
import {BsPencilSquare} from 'react-icons/bs'
export default function Hotnew() {
  return (
    <>
      <div className={styles.bigcontainer}>
        <div className={styles.container1}>
          <div className={styles.ptext}>熱門</div>
          <div className={styles.ptext}>最新</div>
        </div>
        <div className={styles.container2}>
          <div className={styles.ptext}> 
          <BsPencilSquare/>
          </div>
          <div className={styles.ptext}>我的文章</div>
        </div>
      </div>
    </>
  );
}
