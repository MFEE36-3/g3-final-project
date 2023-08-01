import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import styles from './mem-achieveArea.module.css';
import MemBtn from './mem-Btn';
import Swal from 'sweetalert2';

export default function MemAchieveCard({ image, name }) {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const changeAchieve = (image) => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch('http://localhost:3002/member/changeAchieve', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire('成就已更換', '', 'success');
          setAuth({ ...auth, achieve_image: image });
        });
    }
  };

  return (
    <button
      className={styles.card}
      onClick={() => {
        changeAchieve(image);
      }}
    >
      <Image
        src={'http://localhost:3002/img/' + image}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        alt=""
      />
      <div>{name}</div>
    </button>
  );
}
