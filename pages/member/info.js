import React from 'react';
import MemrBar from '@/components/common/member/mem-bar';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function aandex() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles.title}>基本資料</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
