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
import MemBtn from '@/components/member/mem-Btn';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const { auth } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [store, setStore] = useState([]);

  // 抓會員自己的發文
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/forumPost', {
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

  const MyList = list.map((v) => {
    return {
      title: v.header,
      time: v.publishedTime?.substring(0, 10),
    };
  });

  // 抓會員收藏的店家
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/favoritetStore', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStore(data);
        });
    }
  }, [auth]);

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

  const [collect, setCollect] = useState(
    <MemCollectReocrd1 ListForum={ListForum} />
  );
  const changeList = (e) => {
    switch (e.currentTarget.value) {
      case '貼文':
        setCollect(<MemCollectReocrd1 ListForum={ListForum} />);
        break;

      case '店家':
        setCollect(<MemCollectReocrd2 store={store} />);
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
                  <MemCollectBlog title={v.title} time={v.time} key={v4()} />
                );
              })}
            </div>
          </div>
          <MemAllTitle title={'我的收藏'} />
          <div className={styles2.area2}>
            <div className={styles2.scrollArea}>
              <MemBtn text={'貼文'} onClick={changeList} />

              <MemBtn text={'店家'} onClick={changeList} />
            </div>
            <div className={styles2.scroll}>{collect}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
