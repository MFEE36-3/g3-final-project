import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemCouponCard from '@/components/common/member/mem-couponCard';
import MemCouponRecord from '@/components/common/member/mem-couponRecord';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-coupon.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';
import Image from 'next/image';

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

  const expired = [
    {
      name: '生日快樂1',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/15',
      state: '過期',
    },
    {
      name: '生日快樂2',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/16',
      state: '過期',
    },
    {
      name: '生日快樂3',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/17',
      state: '過期',
    },
    {
      name: '生日快樂4',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/18',
      state: '過期',
    },
    {
      name: '生日快樂5',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/19',
      state: '過期',
    },
    {
      name: '生日快樂6',
      content: '送給您的生日禮物',
      money: 100,
      time: '2023/04/20',
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
              <div className={styles2.title}>{'我的優惠券'}</div>
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
              <div className={styles.title}>{'已使用 / 失效 / 過期'}</div>
              <div className={styles2.scroll}>
                {expired.map((v) => {
                  return (
                    <MemCouponRecord
                      name={v.name}
                      content={v.content}
                      money={v.money}
                      time={v.time}
                      state={v.state}
                      key={v4()}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
