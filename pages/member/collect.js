import React from 'react';
import MemBar from '@/components/member/mem-bar';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-collect.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemCollectBlog from '@/components/member/mem-collectBlog';
import { v4 } from 'uuid';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemAllTitle from '@/components/member/mem-allTitle';
import MemCollectReocrd1 from '@/components/member/mem-collectRecord1';
import MemCollectReocrd2 from '@/components/member/mem-collectRecord2';
import MemCollectReocrd3 from '@/components/member/mem-collectRecord3';
import MemBtn from '@/components/member/mem-Btn';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const { auth } = useContext(AuthContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/memberCoupon', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setList(data);
        });
    }
  }, [auth]);
  console.log(auth);

  const MyList = [
    {
      type: '踩雷',
      title: '喜歡吃阿得快餐的人到底在想什麼',
      time: '2023/07/08',
    },
    {
      type: '推薦',
      title: '信義路三段的隱藏美食-胡其林火鍋',
      time: '2023/07/21',
    },
    {
      type: '閒聊',
      title: '求推薦東門站附近的午餐',
      time: '2023/07/21',
    },
  ];

  const ListForum = [
    {
      title: '有人喝過上宇林的鼎極鮮奶茶嗎?',
      type: '閒聊',
      author: 'a45678',
      time: '2023/07/08',
    },
    {
      title: '有人喝過上宇林的鼎極鮮奶茶嗎?',
      type: '閒聊',
      author: 'a45678',
      time: '2023/07/08',
    },
    {
      title: '有人喝過上宇林的鼎極鮮奶茶嗎?',
      type: '閒聊',
      author: 'a45678',
      time: '2023/07/08',
    },
  ];

  const ListStore = [
    {
      store: '雅室牛排仁愛圓環店',
      type: '西式',
      address: '台北市大安區',
    },
    {
      store: '五燈獎豬腳飯',
      type: '中式',
      address: '新北市三重區',
    },
    {
      store: '金花子韓式料理',
      type: '韓式',
      address: '新北市中和區',
    },
  ];

  const ListMarket = [
    {
      name: '極品蝦餃',
      store: '宜靜水餃專賣',
      price: 150,
      type: '水餃',
    },
    {
      name: '泰式雞腿排',
      store: '阿鄉香雞排',
      price: 110,
      type: '炸物',
    },
    {
      name: '阿母a愛心便當',
      store: '黃老師便當官方商城',
      price: 50,
      type: '便當',
    },
  ];

  const [collect, setCollect] = useState(
    <MemCollectReocrd1 ListForum={ListForum} />
  );
  const changeList = (e) => {
    switch (e.currentTarget.value) {
      case '貼文':
        setCollect(<MemCollectReocrd1 ListForum={ListForum} />);
        break;

      case '店家':
        setCollect(<MemCollectReocrd2 ListStore={ListStore} />);
        break;

      case '商品':
        setCollect(<MemCollectReocrd3 ListMarket={ListMarket} />);
        break;
    }
  };

  const router = useRouter();

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
          <MemAllTitle title={'我的貼文'} />
          <div className={styles2.area1}>
            <div className={styles2.scroll}>
              {MyList.map((v) => {
                return (
                  <MemCollectBlog
                    type={v.type}
                    title={v.title}
                    time={v.time}
                    key={v4()}
                  />
                );
              })}
            </div>
          </div>
          <MemAllTitle title={'我的收藏'} />
          <div className={styles2.area2}>
            <div className={styles2.scrollArea}>
              <MemBtn text={'貼文'} onClick={changeList} />

              <MemBtn text={'店家'} onClick={changeList} />

              <MemBtn text={'商品'} onClick={changeList} />
            </div>
            <div className={styles.scroll}>
              <div>{collect}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
