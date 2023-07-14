import styles from './mem-infoBtn.module.css';

export default function MemInfoBtn({ tag, content, change }) {
  return (
    <div className={styles.flex}>
      <div className={styles.tag}>● {tag}</div>
      <div className={styles.content}>
        <input className={styles.input} value={content} readOnly />
        {change && <button className={styles.btn}>{change}</button>}
      </div>
    </div>
  );
}
