import React from 'react';
import styles from './mem-nologin.module.css';
import Loading from '@/public/trycheckoutimage/loading.svg';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function MemNologin() {
  const LoadingSvg = styled.img`
    width: 5%;
    @keyframes LoadingRun {
      from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(720deg);
      }
    }
    animation: LoadingRun 8s ease-in-out infinite;
  `;

  return (
    <div className={styles.container}>
      <div className={styles.area}>尚未登入會員，即將回到首頁</div>
      <div style={{ marginTop: '-50px' }}>
        <Image src={'/member/nologin.gif'} width={100} height={100} alt="" />
      </div>
    </div>
  );
}
