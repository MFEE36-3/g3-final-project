import styles from './mem-bar.module.css';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export default function MemBar() {
  // 創建一個陣列，包含此navbar需要的按鈕名與路徑
  const arr = [
    { name: '會員中心', url: '/member' },
    { name: '我的錢包', url: '/member/money' },
    { name: '個人資料', url: '/member/info' },
    { name: '貼文與收藏', url: '/member/collect' },
    { name: '活動紀錄', url: '/member/record' },
    { name: '優惠券', url: '/member/coupon' },
  ];

  // 從useContext裡解構出auth驗證token跟基本會員資料memberData
  const { auth } = useContext(AuthContext);

  // 由於useEffect重新渲染時會有第一次沒資料、第二次有資料的問題
  // 在填入變數時要在變數後面加上? 代表內容不是null或undefined才會訪問其屬性
  return (
    <div className={styles.memBar}>
      <div className={styles.memBtnTop}>
        <div className={styles.memImgBox}>
          <Image
            src={'http://localhost:3002/img/member/' + auth?.photo}
            style={{ objectFit: 'cover' }}
            width={500}
            height={500}
            className={styles.memImg}
            alt=""
          />
          <Image
            src={'http://localhost:3002/img/member/' + auth?.achieve_image}
            width={200}
            height={200}
            className={styles.achImg}
            style={{ objectFit: 'cover' }}
            alt=""
          />
        </div>
        <div className={styles.memText}>{auth?.achieve_name}</div>
        <div className={styles.memText}>{auth?.nickname}</div>
        <div className={styles.memEmail}>{auth?.account}</div>
      </div>
      {arr.map((v) => {
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
