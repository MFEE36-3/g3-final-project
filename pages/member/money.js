import React from 'react';
import MemBar from '@/components/member/mem-bar';
import MemMoneyCard from '@/components/member/mem-moneyCard';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-money.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemAllTitle from '@/components/member/mem-allTitle';
import MemMoneyReocrdTable from '@/components/member/mem-moneyReocrdTable';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const rows = [
    {
      context: '升級尊榮會員三個月',
      money: 549,
      time: '2023/06/19 12:31',
      id: 123456,
    },
    {
      context: '升級尊榮會員三個月',
      money: 549,
      time: '2023/06/19 12:31',
      id: 123457,
    },
    {
      context: '升級尊榮會員三個月',
      money: 549,
      time: '2023/06/19 12:31',
      id: 123458,
    },
    {
      context: '升級尊榮會員三個月',
      money: 549,
      time: '2023/06/19 12:31',
      id: 123459,
    },
    {
      context: '升級尊榮會員三個月',
      money: 549,
      time: '2023/06/19 12:31',
      id: 123450,
    },
  ];

  const { auth } = useContext(AuthContext);
  const router = useRouter();

  // if (!auth.account) {
  //   setTimeout(() => {
  //     router.push('/');
  //   }, 500);
  //   return <MemNologin />;
  // }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.area0}>
            <div className={styles2.area1}>
              <MemAllTitle title={'我的錢包'} />

              <div className={styles2.nowMoney}>NT$ {auth?.wallet}</div>
              <div className={styles2.inputArea}>
                <label className={styles2.label}>
                  <div className={styles2.title}>儲值</div>
                  <input type="text" className={styles2.input}></input>
                </label>
                <button className={styles2.btn}>確認</button>
              </div>
            </div>
            <div className={styles2.imgArea}>
              <div className={styles2.imgText}>您的尊榮會員還有 21 天到期</div>
            </div>
          </div>
          <div className={styles2.levelArea}>
            <MemAllTitle title={'會員升級'} />
            <div className={styles2.area2}>
              <MemMoneyCard />
              <div className={styles2.text}>
                加入尊榮會員，每天可獲得2張揪團9折優惠券 ( 限當天使用
                )，商城商品全享9折，不定時贈送各種優惠券
              </div>
            </div>
          </div>
          <div className={styles2.recordArea}>
            <MemAllTitle title={'儲值紀錄'} />
            <div className={styles2.area3}>
              <div className={styles2.recordBox}>
                <MemMoneyReocrdTable rows={rows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
