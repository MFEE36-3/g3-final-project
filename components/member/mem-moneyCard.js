import React from 'react';
import styles from './mem-moneyCard.module.css';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export default function MemMoneyCard() {
  const { auth } = useContext(AuthContext);

  const sendData = (e) => {
    console.log(e.target.textContent);
    const cardData = {
      // 會員id
      // 內容
      // 價格
    };
  };

  return (
    <div className={styles.cardBox}>
      <button className={styles.card} onClick={sendData}>
        尊榮會員一個月199元
      </button>
      <button className={styles.card2} onClick={sendData}>
        尊榮會員三個月549元
      </button>
      <button className={styles.card3} onClick={sendData}>
        尊榮會員六個月999元
      </button>
      <button className={styles.card4} onClick={sendData}>
        尊榮會員12個月1799元
      </button>
    </div>
  );
}
