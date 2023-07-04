import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemPack from '@/components/common/member/mem-package';
import MemAct from '@/components/common/member/mem-activity';
import MemActLong from '@/components/common/member/mem-activityLong';
import styles from '@/styles/member-css/mem-body.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function Index() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.right}>
          <div className={styles.rightflex}>
            <MemPack />
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
          </div>
          <div>
            <MemActLong content={'我的活動'} />
          </div>
          <div className={styles.rightflex}>
            <div className={styles.rightbox}>
              <MemAct content={'消費趨勢'} />
            </div>
            <div className={styles.rightbox}>
              <MemAct content={'本月走向'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
