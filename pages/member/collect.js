import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-collect.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function Index() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div>
            <div className={styles2.area1}>
              <div className={styles.title}>{'我的文章'}</div>
              <div className={styles.scroll}>
                <div className={styles.scrollCard}>
                  【開山羌】RRRRRRRR小宇幫我開直播
                </div>
                <div className={styles.scrollCard}>
                  【開山羌】RRRRRRRR小宇幫我開直播
                </div>
                <div className={styles.scrollCard}>
                  【開山羌】RRRRRRRR小宇幫我開直播
                </div>
                <div className={styles.scrollCard}>
                  【開山羌】RRRRRRRR小宇幫我開直播
                </div>
                <div className={styles.scrollCard}>
                  【開山羌】RRRRRRRR小宇幫我開直播
                </div>
              </div>
            </div>
            <div className={styles2.area2}>
              <div className={styles.title}>{'我的收藏'}</div>
              <div className={styles.scroll}>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
                <div className={styles.scrollCard}>123456</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
