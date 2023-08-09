import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemBar from '@/components/member/mem-bar';
import {
  MemActivityRecord1,
  MemActivityRecord2,
  MemActivityRecord3,
  MemActivityRecord4,
} from '@/components/member/mem-activityRecord';
import MemAllTitle from '@/components/member/mem-allTitle';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-activity.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemBtn from '@/components/member/mem-Btn';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Record() {
  const Record1 = [
    {
      id: 123456,
      name: 'A213',
      content: '高麗菜包x10',
      store: '老蔡水煎包',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
  ];

  const Record2 = [
    {
      id: 'v12345',
      money: 250,
      content: '蒜香鹽酥雞',
      store: '阿國雞排',
      time: '2023/06/22',
      score: 3.5,
    },
  ];

  const Record3 = [
    {
      id: 'v12345',
      money: 2500,
      number: 6,
      store: '大橋頭熱炒',
      time: '2023/06/22',
      score: 5,
    },
  ];
  const Record4 = [
    {
      id: 'v12345',
      money: 800,
      content: '人蔘烏骨雞湯',
      store: '阿豪師官方商城',
      time: '2023/03/03',
      score: 3,
    },
  ];
  const Record5 = [
    {
      id: 'v12345',
      money: 800,
      content: '人蔘烏骨雞湯',
      store: '阿豪師官方商城',
      time: '2023/03/03',
      score: 3,
    },
  ];

  const [record, setRecord] = useState(
    <MemActivityRecord1 Record1={Record1} />
  );

  const { auth } = useContext(AuthContext);

  const router = useRouter();

  const changeRecord = (e) => {
    switch (e.currentTarget.value) {
      case '跟團':
        setRecord(<MemActivityRecord1 Record1={Record1} />);
        break;

      case '開團':
        setRecord(<MemActivityRecord1 Record1={Record2} />);
        break;

      case '外帶':
        setRecord(<MemActivityRecord2 Record2={Record3} />);
        break;

      case '訂位':
        setRecord(<MemActivityRecord3 Record3={Record4} />);
        break;

      case '商城':
        setRecord(<MemActivityRecord4 Record4={Record5} />);
        break;
    }
  };

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
            <div className={styles2.actArea}>
              <MemAllTitle title={'活動紀錄'} />
              <div className={styles2.area2}>
                <div className={styles2.scrollArea2} style={{ width: '100%' }}>
                  <MemBtn text={'跟團'} onClick={changeRecord} />
                  <MemBtn text={'開團'} onClick={changeRecord} />
                  <MemBtn text={'訂位'} onClick={changeRecord} />
                  <MemBtn text={'外帶'} onClick={changeRecord} />
                  <MemBtn text={'商城'} onClick={changeRecord} />
                </div>

                <div className={styles2.scroll2}>{record}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
