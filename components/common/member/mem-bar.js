import styles from './mem-bar.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function MemBar() {
  const arr = [
    { name: '會員中心', url: '/member' },
    { name: '個人資料', url: '/member/info' },
    { name: '美食錢包', url: '/member/money' },
    { name: '我的活動', url: '/member/activity' },
    { name: '我的收藏', url: '/member/collect' },
    { name: '優惠券', url: '/member/coupon' },
  ];

  const [hoveredButtons, setHoveredButtons] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredButtons((prevHoveredButtons) => [...prevHoveredButtons, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredButtons((prevHoveredButtons) =>
      prevHoveredButtons.filter((btnIndex) => btnIndex !== index)
    );
  };

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
            src="/member/cookie.png"
            width={500}
            height={500}
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
          <>
            <Link
              href={v.url}
              style={{
                textDecoration: 'none',
              }}
              key={i}
            >
              <button
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className={
                  hoveredButtons.includes(i)
                    ? styles.memBtnClick
                    : styles.memBtn
                }
              >
                {v.name}
              </button>
            </Link>
          </>
        );
      })}
    </div>
  );
}
