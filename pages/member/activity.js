import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemActivityRecord from '@/components/common/member/mem-activityRecord';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-activity.module.css';
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
              <div className={styles.title}>{'進行中的活動'}</div>
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
              <div className={styles.title}>{'已完成的活動'}</div>
              <div className={styles.scroll}>
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
                <MemActivityRecord
                  type={'揪團'}
                  title={'老蔡水煎包'}
                  content={'高麗菜包x10'}
                  money={'170'}
                  time={'2023/07/01'}
                  score={'4.5'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
