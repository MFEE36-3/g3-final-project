import React from 'react';
import styles from './new_article.module.css';

export default function Article() {
  return (
    <>
      <div className={styles.pad}>
        <div className={styles.container}>
          <p>最新文章</p>
        </div>
        <p className={styles.ptext}></p>
        <p className={styles.ptext2}>內容內容內容內容內容內容內容</p>
        <p className={styles.ptext2}>內容內容內容內容內容內容內容</p>
        <p className={styles.ptext2}>內容內容內容內容內容內容內容</p>
        <p className={styles.ptext2}>內容內容內容內容內容內容內容</p>
      </div>
    </>
  );
}
