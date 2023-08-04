import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import styles from './mem-achieveArea.module.css';
import MemBtn from './mem-Btn';
import MemAchieveCard from './mem-achieveCard';

export default function MemAchieveArea({ openAchiece }) {
  const [achieveCard, setAchieveCard] = useState([]);

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/achieveRecord', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAchieveCard(data);
        });
    }
  }, []);

  return (
    <div className={styles.area}>
      {achieveCard?.map((v) => (
        <MemAchieveCard key={v4()} image={v.image} name={v.name} />
      ))}
      <div className={styles.AchieveBtn}>
        <MemBtn
          text="關閉"
          onClick={() => {
            openAchiece();
          }}
        />
      </div>
    </div>
  );
}
