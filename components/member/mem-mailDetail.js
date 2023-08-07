import { useState, useEffect, useContext } from 'react';
import MemBtn from './mem-Btn';
import Image from 'next/image';
import styles from './mem-mailDetail.module.css';

export default function MemMailDetail({ openMail }) {
  return (
    <div>
      <div>mem-mailDetail</div>
      <div>
        <MemBtn onClick={openMail} text={'取消'} padding={'3px 5px'}></MemBtn>
      </div>
    </div>
  );
}
