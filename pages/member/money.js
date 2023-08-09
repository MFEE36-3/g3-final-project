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
import Image from 'next/image';
import Link from 'next/link';
import IconImg from '@/public/member/icon.png';
import { v4 } from 'uuid';
import Head from 'next/head';

export default function Index() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [record, setRecord] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/walletRecord', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecord(data);
        });
    }
  }, [auth]);

  const rows = record.map((v) => {
    return {
      content: v.content,
      money: v.amount,
      time: v.add_time?.substring(0, 10),
    };
  });

  // 計算尊榮會員剩下幾天
  const deadTime = new Date(auth.dead_time);
  const today = new Date();
  const timeDifference = deadTime.getTime() - today.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // 判斷式否登入，未登入跳轉回首頁
  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, []);

  return !auth.account ? (
    <>
      <Head>
        <title>食GOEAT! / 會員中心</title>
      </Head>

      <MemNologin />
    </>
  ) : (
    <>
      <Head>
        <title>食GOEAT! / 會員中心</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <MemBar />
          <div className={styles.rightArea}>
            <div className={styles2.area0}>
              <div className={styles.package}>
                <div className={styles.flex2}>
                  <div>食GoEat錢包</div>
                  <div>帳號 : {auth?.account}</div>
                </div>

                <div className={styles.packageMoney}>
                  <Image
                    src={IconImg}
                    width={90}
                    height={70}
                    alt=""
                    className={styles.packageImg}
                  />
                  NT$ {auth.wallet}
                </div>

                <div className={styles.packDown}>
                  <Link href={'http://localhost:3000/topup'}>
                    <button className={styles.packageBtn}>前往儲值</button>
                  </Link>
                </div>
              </div>

              <div className={styles2.imgArea}>
                <div className={styles2.imgText}>
                  {auth.level === 1
                    ? '歡迎加入食goEat會員享更多優惠'
                    : '您的尊榮會員還有 ' + remainingDays + ' 天到期'}
                </div>
              </div>
            </div>
            <div className={styles2.levelArea}>
              <MemAllTitle title={'會員升級'} />
              <div className={styles2.area2}>
                <MemMoneyCard />
                <div className={styles2.text}>
                  加入尊榮會員，每天可獲得2張商城9折優惠券 ( 限當天使用
                  )，揪團免外送費，商城免運費
                </div>
              </div>
            </div>
            <div className={styles2.recordArea}>
              <MemAllTitle title={'錢包紀錄'} />

              <div className={styles2.area3}>
                <div className={styles2.recordBox}>
                  <MemMoneyReocrdTable rows={rows} page={page} />
                </div>
              </div>
              <div className={styles2.btnArea}>
                {Array.from({ length: Math.ceil(rows.length / 5) }).map(
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
