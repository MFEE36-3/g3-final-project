import React from 'react';
import styles from '@/styles/member-css/mem-tag.module.css';

export default function MemTag({ content }) {
  return <div className={styles.tag}>{content}</div>;
}
