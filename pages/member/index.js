import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemIndexCard from '@/components/common/member/mem-indexCard';
import styles from '@/styles/member-css/mem-body.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function Index() {
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

              <div className={styles.packageMoney}>NT$ 7414</div>

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <button className={styles.packageBtn}>儲值+</button>
              </div>
            </div>
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
          </div>
          <div>
            <div className={styles.carousel}>
              <div className={styles.title}>{'進行中的活動'}</div>
              <div className={styles.scroll}>
                <MemIndexCard
                  title={'揪團'}
                  content={'半筋半肉牛肉麵(大碗)  光復牛肉麵'}
                />
                <MemIndexCard
                  title={'揪團'}
                  content={'鼎極鮮奶茶  上宇林大安復興店'}
                />
                <MemIndexCard
                  title={'商城'}
                  content={'鮮蝦水餃x100  三玖水餃'}
                />
                <MemIndexCard
                  title={'商城'}
                  content={'韭菜水餃x100  三玖水餃'}
                />
                <MemIndexCard
                  title={'外帶'}
                  content={'排骨炒飯 + 巧克力鍋  鼎泰豐'}
                />
                <MemIndexCard
                  title={'商城'}
                  content={'極品泰國蝦x35  外雙溪釣蝦場'}
                />
              </div>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.box}>
              <div className={styles.title}>本月流行</div>
              <div>你好你好你好你好你好你好</div>
            </div>
            <div className={styles.box}>
              <div className={styles.title}>你的趨勢</div>
              <div>你好你好你好你好你好你好</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
