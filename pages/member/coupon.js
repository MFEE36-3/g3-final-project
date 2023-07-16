import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemCouponCard from '@/components/common/member/mem-couponCard';
import MemCouponRecord from '@/components/common/member/mem-couponRecord';
import MemAllTitle from '@/components/common/member/mem-allTitle';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-coupon.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';

export default function Index() {
  const mycoupon = [
    {
      src: '/member/coupon.png',
      name: '首儲好禮1',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮2',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮3',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮4',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮5',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮6',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
    {
      src: '/member/coupon.png',
      name: '首儲好禮7',
      content: '第一次儲值錢包',
      money: '50元',
      time: '2023 / 11 / 01',
    },
  ];

  const rows = [
    {
      name: '生日快樂1',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/15 17:20',
      state: '過期',
    },
    {
      name: '生日快樂2',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/16 17:20',
      state: '過期',
    },
    {
      name: '生日快樂3',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/17 17:20',
      state: '過期',
    },
  ];

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div>
            <div className={styles2.area1}>
              <MemAllTitle title={'我的優惠券'} />
              <div className={styles2.scroll}>
                {mycoupon.map((v) => {
                  return (
                    <MemCouponCard
                      src={v.src}
                      name={v.name}
                      content={v.content}
                      money={v.money}
                      time={v.time}
                      key={v4()}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles2.area2}>
              <MemAllTitle title={'已使用 / 失效 / 過期'} />
              <div className={styles2.recordBox}>
                <MemCouponRecord rows={rows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
