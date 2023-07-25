import React, { useState, useEffect } from 'react';
import styles from './detail_title.module.css';

export default function DetailTitle({data=''}) {
  return (
    <>
      <div key={data} className={styles.title}>
          {data}
        </div>
    </>
  );
}
