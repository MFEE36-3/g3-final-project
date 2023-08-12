import React from 'react';
import styles from './detail_p.module.css';
import { useState } from 'react';
export default function DetailP({ data = '', key = '' }) {
  return (
    <div key={key} className={styles.ptext}>
      {data}
    </div>
  );
}
