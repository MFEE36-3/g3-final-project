import React from 'react';
import styles from './news_card.module.css';
import Hashtag from './hashtag';

export default function Newscard() {
  return (
    <>
      <div className={styles.cardbody}>
        <div className={styles.card}>
          <img src="/f_imgs/111.jpg" />
          
        </div>
        <p className={styles.ptext}>In-N-Out來台灣了!美國人氣漢堡In-N-Out Burger一日快閃,...</p>
        <Hashtag/>
      </div>
    </>
  );
}
