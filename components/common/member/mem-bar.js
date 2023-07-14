import styles from './mem-bar.module.css';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';

export default function MemBar() {
  const arr = [
    { name: '會員中心', url: '/member' },
    { name: '個人資料', url: '/member/info' },
    { name: '美食錢包', url: '/member/money' },
    { name: '我的活動', url: '/member/activity' },
    { name: '我的收藏', url: '/member/collect' },
    { name: '優惠券', url: '/member/coupon' },
  ];

  return (
    <div className={styles.memBar}>
      <div className={styles.memBtnTop}>
        <div className={styles.memImgBox}>
          <Image
            src="/member/asiagodtone01.jpg"
            style={{ objectFit: 'cover' }}
            width={500}
            height={500}
            className={styles.memImg}
            alt=""
          />
          <Image
            src="/member/badge01.svg"
            width={300}
            height={300}
            className={styles.achImg}
            alt=""
          />
        </div>
        <div className={styles.memText}>超級大盤子</div>
        <div className={styles.memText}>亞洲統神</div>
        <div className={styles.memEmail}>asiagodtone@gmail.com</div>
      </div>
      {arr.map((v, i) => {
        return (
          <Fragment key={v4()}>
            <Link
              href={v.url}
              style={{
                textDecoration: 'none',
              }}
            >
              <button className={styles.memBtn}>{v.name}</button>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
