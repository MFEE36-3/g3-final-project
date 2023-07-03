import React from 'react';
import MemberBar from '@/components/common/member/member-bar';
import styles1 from '@/styles/member-css/member-body.module.css';
import styles2 from '@/styles/member-css/member-container.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function aandex() {
  return (
    <div className={`${styles1.body}`}>
      <div className={styles2.container}>
        <MemberBar />
        <div></div>
      </div>
    </div>
  );
}
