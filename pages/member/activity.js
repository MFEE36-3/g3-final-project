import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemBar from '@/components/member/mem-bar';
import {
  MemActivityRecord1,
  MemActivityRecord2,
  MemActivityRecord3,
  MemActivityRecord4,
} from '@/components/member/mem-activityRecord';
import {
  MemActivityList1,
  MemActivityList2,
  MemActivityList3,
} from '@/components/member/mem-activityList';
import MemAllTitle from '@/components/member/mem-allTitle';
import MemChangeBtn from '@/components/member/mem-changeBtn';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-activity.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemBtn from '@/components/member/mem-Btn';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const List1 = [
    {
      id: 'A123',
      name: 'q01',
      money: '300',
      content: '半筋半肉牛肉麵(大碗)',
      store: '光復牛肉麵',
      time: '2023/07/11',
    },
  ];
  const List2 = [
    {
      id: 'v12345',
      money: '300',
      content: '排骨炒飯',
      store: '鼎泰豐',
      time: '2023/07/11',
    },
  ];
  const List3 = [
    {
      id: 'v12345',
      store: '鼎泰豐',
      number: 5,
      time: '2023/07/11 12:00',
    },
  ];
  const List4 = [
    {
      id: 'v12345',
      money: 300,
      content: '韭菜水餃x100',
      store: '三玖水餃',
      time: '2023/07/11',
    },
  ];
  const List5 = [
    {
      id: 'v12345',
      money: 300,
      content: '韭菜水餃x100',
      store: '三玖水餃',
      time: '2023/07/11',
    },
  ];

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
    {
      id: 123456,
      name: 'A213',
      content: '高麗菜包x10',
      store: '老蔡水煎包',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
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
    {
      id: 'v12345',
      money: 250,
      content: '蒜香鹽酥雞',
      store: '阿國雞排',
      time: '2023/06/22',
      score: 3.5,
    },
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
    {
      id: 'v12345',
      money: 2500,
      number: 6,
      store: '大橋頭熱炒',
      time: '2023/06/22',
      score: 5,
    },
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
    {
      id: 'v12345',
      money: 800,
      content: '人蔘烏骨雞湯',
      store: '阿豪師官方商城',
      time: '2023/03/03',
      score: 3,
    },
    {
      id: 'v12345',
      money: 800,
      content: '人蔘烏骨雞湯',
      store: '阿豪師官方商城',
      time: '2023/03/03',
      score: 3,
    },
  ];
  const [list, setList] = useState(<MemActivityList1 List1={List1} />);
  const [record, setRecord] = useState(
    <MemActivityRecord1 Record1={Record1} />
  );

  const { auth } = useContext(AuthContext);

  const router = useRouter();

  const changeList = (e) => {
    switch (e.currentTarget.value) {
      case '餐廳訂位':
        setList(<MemActivityList1 List3={List3} />);
        break;

      case '外帶餐點':
        setList(<MemActivityList2 List4={List4} />);
        break;

      case '商城訂單':
        setList(<MemActivityList3 List4={List5} />);
        break;
    }
  };

  const changeRecord = (e) => {
    switch (e.currentTarget.value) {
      case '揪團':
        setRecord(<MemActivityRecord1 Record1={Record1} />);
        break;

      case '外帶':
        setRecord(<MemActivityRecord2 Record2={Record2} />);
        break;

      case '訂位':
        setRecord(<MemActivityRecord3 Record3={Record3} />);
        break;

      case '商城':
        setRecord(<MemActivityRecord4 Record4={Record4} />);
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
    <MemNologin />
  ) : (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.actArea}>
            <MemAllTitle title={'進行中的活動'} />
            <div className={styles2.area1}>
              <div className={styles2.scrollArea}>
                <MemBtn
                  text={'餐廳訂位'}
                  onClick={changeList}
                  className={styles2.scrollBtn}
                />
                <MemBtn
                  text={'外帶餐點'}
                  onClick={changeList}
                  className={styles2.scrollBtn}
                />
                <MemBtn
                  text={'商城訂單'}
                  onClick={changeList}
                  className={styles2.scrollBtn}
                />
              </div>
              <div className={styles2.scroll}>{list}</div>
            </div>
            <MemAllTitle title={'活動紀錄'} />
            <div className={styles2.area2}>
              <div className={styles2.scrollArea} style={{ width: '100%' }}>
                <MemBtn text={'揪團'} onClick={changeRecord} />
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
  );
}
