import React from 'react';
import MemBar from '@/components/member/mem-bar';
import MemCouponCard from '@/components/member/mem-couponCard';
import MemCouponRecord from '@/components/member/mem-couponRecord';
import MemAllTitle from '@/components/member/mem-allTitle';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-coupon.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const { auth } = useContext(AuthContext);
  const [coupon, setCoupon] = useState([]);
  const [page, setPage] = useState(0);

  const router = useRouter();

  // 抓可使用的優惠券資料
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/coupon', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCoupon(data);
        });
    }
  }, [auth]);

  const mycoupon = coupon
    .filter((v) => v.coupon_status_sid === 1)
    .map((v) => {
      return {
        name: v.coupon_title,
        money: v.coupon_discount + '元',
        time: v.coupon_dead_time?.substring(0, 10),
      };
    });

  const record = coupon
    .filter((v) => v.coupon_status_sid !== 1)
    .map((v) => {
      return {
        name: v.coupon_title,
        money: v.coupon_discount + '元',
        time: v.coupon_get_time?.substring(0, 10),
        status: v.coupon_status_sid,
      };
    });

  // 判斷式否登入，未登入跳轉回首頁
  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, []);

  return !auth.account ? (
    <MemNologin />
  ) : (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.flexArea}>
            <MemAllTitle title={'我的優惠券'} />
            <div className={styles2.area1}>
              {mycoupon ? (
                <div className={styles2.scroll}>
                  {mycoupon.map((v) => {
                    return (
                      <MemCouponCard
                        name={v.name}
                        money={v.money}
                        time={v.time}
                        key={v4()}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles2.default}>優惠券都用完囉</div>
              )}
            </div>
            <MemAllTitle title={'已使用 /已過期'} />
            <div className={styles2.btnArea}>
              {Array.from({ length: Math.ceil(record.length / 5) }).map(
                (_, i) => (
                  <button
                    key={v4()}
                    className={styles2.recordBtn}
                    onClick={() => setPage(i * 5)}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
            <div className={styles2.area2}>
              {mycoupon ? (
                <div className={styles2.recordBox}>
                  <MemCouponRecord record={record} page={page} />
                </div>
              ) : (
                <div className={styles2.default}>目前沒有使用紀錄</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
