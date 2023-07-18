import styles from './mem-infoBtn.module.css';
import Btn from '../btn';

export default function MemInfoBtn({ tag, content, change }) {
  return (
    <div className={styles.listflex}>
      <div className={styles.listtag}>● {tag}</div>
      <div className={styles.listcontent}>
        <input className={styles.listinput} value={content} readOnly />
        {change && <Btn text={change} padding={'50px 12px'} fs="var(--h6)" />}
      </div>
    </div>
  );
}
