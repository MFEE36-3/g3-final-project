import React from 'react';
import styles from './tag_time.module.css'
export default function TagTime({data=''}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.kanban}>食GOEAT! 哈拉區</div>
        <div>{data}</div>
      </div>
    </>
  );
}
