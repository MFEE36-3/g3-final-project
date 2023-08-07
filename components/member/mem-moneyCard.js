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
  const router = useRouter();

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
        });
    }
  }, [auth]);

  const sendData = (v) => {
    localStorage.setItem(
      'subscribe',
      JSON.stringify({
        itemID: {
          itemID: v.sid,
          itemName: v.name,
          amount: 1,
          src: 'http://localhost:3000/member/cookie.png',
          price: v.price,
        },
      })
    );

    router.push('http://localhost:3000/checkout');
  };
  // {id:{itemID, itemName, amount , src, price}}
  // http://localhost:3000/checkout
  // http://localhost:3000/topup

  return (
    <div className={styles.cardBox}>
      {card?.map((v) => {
        return (
          <button
            className={styles.card}
            onClick={() => sendData(v)}
            key={v4()}
          >
            {v.name}
            {v.price + '元'}
          </button>
        );
      })}
    </div>
  );
}
