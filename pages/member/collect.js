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
import Link from 'next/link';

export default function Index() {
  const { auth } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [store, setStore] = useState([]);
  const [forum, setForum] = useState([]);
  const [open, setOpen] = useState(false);

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

  const MyList = list?.map((v) => {
    return {
      title: v.header,
      time: v.publishedTime?.substring(0, 10),
      sid: v.forum_sid,
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

  // 抓會員收藏的貼文
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/favoritePost', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setForum(data);
        });
    }
  }, [auth]);

  const changeList = () => {
    setOpen(!open);
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
            {MyList ? (
              <div className={styles2.scroll}>
                {MyList.map((v) => {
                  return (
                    <MemCollectBlog
                      sid={v.sid}
                      title={v.title}
                      time={v.time}
                      key={v4()}
                    />
                  );
                })}
              </div>
            ) : (
              <Link
                href={'http://localhost:3000/forum'}
                className={styles2.default}
              >
                尚未撰寫任何貼文，前往論壇
              </Link>
            )}
          </div>
          <MemAllTitle title={'我的收藏'} />
          <div className={styles2.area2}>
            <div className={styles2.scrollArea}>
              <MemBtn text={'收藏貼文'} onClick={changeList} />

              <MemBtn text={'收藏店家'} onClick={changeList} />
            </div>
            {open ? (
              <div className={styles2.scroll2}>
                <MemCollectReocrd2 store={store} />
              </div>
            ) : (
              <div className={styles2.scroll2}>
                <MemCollectReocrd1 forum={forum} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
