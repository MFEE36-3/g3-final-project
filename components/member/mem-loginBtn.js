import React, { useState } from 'react';
import styles from './mem-loginBtn.module.css';

export default function MemLoginBtn({ change, setChange }) {
  const [moveRight, setMoveRight] = useState(false);

  const handleClick = () => {
    setChange(!change); // 改變父元件的 change 狀態
    if (moveRight) {
      setMoveRight(false); // 按鈕已經向右移動，再次點擊時將 moveRight 狀態設置為 false，使按鈕回到原位
    } else {
      setMoveRight(true); // 按鈕尚未向右移動，再次點擊時將 moveRight 狀態設置為 true，使按鈕向右移動
    }
  };

  return (
    <button className={styles.mainbody} onClick={handleClick}>
      <div
        className={`${styles.ball} ${moveRight ? styles.ball2 : ''}`} // 判斷 moveRight 狀態，套用不同的 CSS 類
        style={{  backgroundImage: moveRight ? `url(./buyforme/map/user_icon/hamburger.svg)`:`url(./buyforme/map/user_icon/chocoCookie.svg)`}}
      ></div>
    </button>
  );
}
