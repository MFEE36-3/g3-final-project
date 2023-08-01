import React from 'react';
import styles from './mem-moneyCard.module.css';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';

export default function MemMoneyCard() {
  const { auth } = useContext(AuthContext);
  const [card, setCard] = useState([]);

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/moneyCard', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCard(data);
          console.log(card);
        });
    }
  }, [auth]);

  const sendData = (e) => {
    // console.log(e.target.textContent);
  };

  return (
    <div className={styles.cardBox}>
      <button className={styles.card} onClick={sendData}>
        {card[0]?.name}
        {card[0]?.price + '元'}
      </button>
      <button className={styles.card2} onClick={sendData}>
        {card[1]?.name}
        {card[1]?.price + '元'}
      </button>
      <button className={styles.card3} onClick={sendData}>
        {card[2]?.name}
        {card[2]?.price + '元'}
      </button>
      <button className={styles.card4} onClick={sendData}>
        {card[3]?.name}
        {card[3]?.price + '元'}
      </button>
    </div>
  );
}
