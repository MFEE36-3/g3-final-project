import styles from '@/styles/member-css/member-bar.module.css';
import MemberBar2 from './member-bar2';
import Image from 'next/image';

export default function MemberBar() {
  const arr = [
    '會員中心',
    '個人資料',
    '美食錢包',
    '我的活動',
    '活動紀錄',
    '我的收藏',
    '優惠券',
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
        return <MemberBar2 Info={v} key={i} />;
      })}
    </div>
  );
}
