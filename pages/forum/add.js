import React from 'react';
import styles from './add.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Newnav from '@/components/common/news/new_nav';

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <Newnav />
        
          <h3 className={styles.text}>新增貼文</h3>
          <div className={styles.line}></div>
          {/* <Button
          className={styles.btn}
          sx={{ '&& .MuiTouchRipple-child': { backgroundColor: '#911010' } }}
        >
          <div className={styles.btn_text}>點擊選擇看板</div>
        </Button> */}
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
          <textarea
            type="text"
            placeholder="敘述"
            className={styles.input2}
          ></textarea>

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
