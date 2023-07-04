import React from 'react';
import styles from '@/styles/member-css/mem-body.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemForm from '@/components/common/member/mem-form';

export default function aandex() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div>
          <MemForm />
        </div>
      </div>
    </div>
  );
}
