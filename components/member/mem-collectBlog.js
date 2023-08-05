import React from 'react';
import styles from './mem-collectBlog.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function MemCollectBlog({ sid, title, time }) {
  let cutTitle = title;
  if (title?.length > 25) {
    cutTitle = title.substring(0, 25) + '...';
  }

  return (
    <Link href={'http://localhost:3000/forum/' + sid}>
      <button className={styles.card}>
        <div>
          <Image
            src={'http://localhost:3002/img/member/book.svg'}
            width={35}
            height={35}
            alt=""
            style={{ marginLeft: '20px' }}
          />
        </div>
        <div className={styles.box2}>【 {cutTitle} 】</div>
        <div className={styles.box3}>{time}</div>
      </button>
    </Link>
  );
}
