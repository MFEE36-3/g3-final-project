import React from 'react';
import styles from './add.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  return (
    <>
      <div className={styles.center}>
        <h3 className={styles.text}>新增貼文</h3>

        <div className={styles.line}></div>

        <button className={styles.kanban}>點擊選擇看板</button>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="請輸入標題"
            className={styles.input1}
          ></input>
        </div>
        <input type="text" placeholder="敘述" className={styles.input2}></input>

        <div className={styles.between}>
          <FontAwesomeIcon icon={faImage} className={styles.icon} />
            <div className={styles.end}>
              <button className={styles.cancel}>取消</button>
              <button className={styles.addbtn}>新增</button>
            </div>
          </div>
        </div>
      
    </>
  );
}
