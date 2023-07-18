import styles from './mem-bar.module.css';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';

export default function MemBar() {
  const arr = [
    { name: '會員中心', url: '/member' },
    { name: '個人資料', url: '/member/info' },
    { name: '美食錢包', url: '/member/money' },
    { name: '我的活動', url: '/member/activity' },
    { name: '我的收藏', url: '/member/collect' },
    { name: '優惠券', url: '/member/coupon' },
  ];
  const router = useRouter();

  const [res, setRes] = useState({});

  useEffect(() => {
    fetch('http://localhost:3002/member')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result = data[0];
        setRes(result);
      });
  }, [router.query]);

  const { nickname, achieve, photo, account } = res;

  return (
    <div className={styles.memBar}>
      <div className={styles.memBtnTop}>
        <div className={styles.memImgBox}>
          <Image
            src={'http://localhost:3002/img/' + photo}
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
        <div className={styles.memText}>{achieve}</div>
        <div className={styles.memText}>{nickname}</div>
        <div className={styles.memEmail}>{account}</div>
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
