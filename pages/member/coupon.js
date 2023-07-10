import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-coupon.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import MemCouponCard from '@/components/common/member/mem-couponCard';

export default function Index() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div>
            <div className={styles2.area1}>
              <div className={styles2.title}>{'我的優惠券'}</div>
              <div className={styles2.scroll}>
                <MemCouponCard
                  src={'/member/coupon.png'}
                  name={'首儲好禮'}
                  content={'第一次儲值錢包'}
                  money={'50元'}
                  time={'2023 / 11 / 01'}
                />
                <MemCouponCard
                  src={'/member/coupon.png'}
                  name={'首儲好禮'}
                  content={'第一次儲值錢包'}
                  money={'50元'}
                  time={'2023 / 11 / 01'}
                />
                <MemCouponCard
                  src={'/member/coupon.png'}
                  name={'首儲好禮'}
                  content={'第一次儲值錢包'}
                  money={'50元'}
                  time={'2023 / 11 / 01'}
                />
                <MemCouponCard
                  src={'/member/coupon.png'}
                  name={'首儲好禮'}
                  content={'第一次儲值錢包'}
                  money={'50元'}
                  time={'2023 / 11 / 01'}
                />
                <MemCouponCard
                  src={'/member/coupon.png'}
                  name={'首儲好禮'}
                  content={'第一次儲值錢包'}
                  money={'50元'}
                  time={'2023 / 11 / 01'}
                />
              </div>
            </div>
            <div className={styles2.area2}>
              <div className={styles.title}>{'已過期/失效'}</div>
              <div className={styles2.scroll}>
                <div className={styles2.scrollCard2}>123465</div>
                <div className={styles2.scrollCard2}>123456</div>
                <div className={styles2.scrollCard2}>123456</div>
                <div className={styles2.scrollCard2}>123456</div>
                <div className={styles2.scrollCard2}>123456</div>
                <div className={styles2.scrollCard2}>123456</div>
                <div className={styles2.scrollCard2}>123456</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
