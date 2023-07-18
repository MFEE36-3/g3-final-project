import styles from './mem-infoBtn.module.css';

export default function MemInfoBtn({ tag, content, change }) {
  return (
    <div className={styles.listflex}>
      <div className={styles.listtag}>● {tag}</div>
      <div className={styles.listcontent}>
        <input className={styles.listinput} value={content} readOnly />
        {change && <button className={styles.listbtn}>{change}</button>}
      </div>
    </div>
  );
}
