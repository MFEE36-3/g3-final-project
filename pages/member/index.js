import React from 'react';
import MemBar from '@/components/member/mem-bar';
import MemIndexCard from '@/components/member/mem-indexCard';
import styles from '@/styles/member/mem-body.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';
import Link from 'next/link';
import IconImg from '@/public/member/icon.png';
import MemAllTitle from '@/components/member/mem-allTitle';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';

export default function Index() {
  const { auth, memberData } = useContext(AuthContext);
  const [info, setInfo] = useState({ account: '' });
  // console.log(auth.token);

  useEffect(() => {
    if (!auth.token) return;

    // 用一個jwt固定格式存放登入後獲得的token，放在headers準備傳給後端
    const Authorization = 'Bearer ' + auth.token;
    fetch('http://localhost:3002/member', {
      method: 'GET',
      headers: {
        Authorization,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // 後端回傳的資料後重新渲染+塞入預設物件裡面
        console.log(data);
        setInfo(data[0]);
        console.log(info);
      });

    // 每次登出與重新登入都會觸發這個useEffect
  }, [auth]);
  // }, []);

  const actNow = [
    { title: '揪團', content: '半筋半肉牛肉麵(大碗)  光復牛肉麵' },
    { title: '揪團', content: '鼎極鮮奶茶  上宇林大安復興店' },
    { title: '商城', content: '鮮蝦水餃x100  三玖水餃' },
    { title: '商城', content: '韭菜水餃x100  三玖水餃' },
    { title: '外帶', content: '排骨炒飯 + 巧克力鍋  鼎泰豐' },
    { title: '外帶', content: '極品泰國蝦x35  外雙溪釣蝦場' },
  ];

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles.flex}>
            <div className={styles.package}>
              <div className={styles.flex2}>
                <div>我的錢包</div>
                <div>帳號:{auth.account}</div>
              </div>

              <div className={styles.packageMoney}>
                <Image
                  src={IconImg}
                  width={80}
                  alt=""
                  className={styles.packageImg}
                />
                NT$ {memberData?.wallet}
              </div>

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link href={'./member/money'}>
                  <button className={styles.packageBtn}>儲值+</button>
                </Link>
              </div>
            </div>
            <Image
              src="/member/cookie.png"
              width={250}
              height={250}
              alt=""
              className={styles.imgRWD1}
            />
            <Image
              src="/member/cookie.png"
              width={250}
              height={250}
              alt=""
              className={styles.imgRWD2}
            />
          </div>

          <div>
            <div className={styles.carousel}>
              <MemAllTitle title={'進行中的活動'} />
              <div className={styles.scroll2}>
                {actNow.map((v) => {
                  return (
                    <>
                      <MemIndexCard
                        title={v.title}
                        content={v.content}
                        key={v4()}
                      />
                    </>
                  );
                })}
                {actNow.map((v) => {
                  return (
                    <>
                      <MemIndexCard
                        title={v.title}
                        content={v.content}
                        key={v4()}
                      />
                    </>
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
