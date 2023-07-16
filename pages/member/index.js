import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemIndexCard from '@/components/common/member/mem-indexCard';
import styles from '@/styles/member-css/mem-body.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';
import Link from 'next/link';
import IconImg from '@/public/member/icon.png';
import MemAllTitle from '@/components/common/member/mem-allTitle';

export default function Index() {
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
              <div className={styles.flex}>
                <div>我的錢包</div>
                <div>帳號:asiagodtone@gmail.com</div>
              </div>

              <div className={styles.packageMoney}>
                <Image
                  src={IconImg}
                  width={80}
                  alt=""
                  className={styles.packageImg}
                />
                NT$ 7414
              </div>

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link href={'./member/money'}>
                  <button className={styles.packageBtn}>儲值+</button>
                </Link>
              </div>
            </div>
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
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
