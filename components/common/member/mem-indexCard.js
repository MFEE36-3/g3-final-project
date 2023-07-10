import React from 'react';
import styles from './mem-indexCard.module.css';

export default function MemIndexCard({ title, content }) {
  return (
    <>
      <a href="./member/activity" className={styles.link}>
        <div className={styles.scrollCard}>
          【{title}】{content}
        </div>
      </a>
    </>
  );
}
