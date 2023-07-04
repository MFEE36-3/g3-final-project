import styles from '@/styles/member-css/mem-bar.module.css';
import MemBarBtn from './mem-barBtn';
import Image from 'next/image';

export default function MemBar() {
  const arr = [
    { name: '會員中心', url: '/member' },
    { name: '個人資料', url: '/member/info' },
    { name: '美食錢包', url: '/member/money' },
    { name: '我的活動', url: '/member/activity' },
    { name: '我的收藏', url: '/member/collect' },
    { name: '優惠券', url: '/member/coupon' },
  ];

  const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
  };

  return (
    <div className={styles.memBar}>
      <div className={styles.memBtnTop}>
        <div style={divStyle}>
          <Image
            src="/member/asiagodtone01.jpg"
            style={{ objectFit: 'cover' }}
            width={500}
            height={500}
            className={styles.memImg}
            alt=""
          />
          <Image
            src=""
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
        return <MemBarBtn Info={v.name} key={i} url={v.url} />;
      })}
    </div>
  );
}
