import React from 'react';
import styles from './new_nav.module.css';
import Link from 'next/link';

export default function Newnav() {
  return (
    <>
      <div className={styles.line}>
        <Link href="/news/demo">
          <button className={styles.nav}>新聞區</button>
        </Link>
        <Link href="/forum/detail">
          <button className={styles.nav}>哈拉區</button>
        </Link>
        <button className={styles.nav}>文章列表</button>
      </div>
    </>
  );
}
