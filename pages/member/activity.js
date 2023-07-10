import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemActivityRecord from '@/components/common/member/mem-activityRecord';
import MemAcitvityCard from '@/components/common/member/mem-activityCard';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-activity.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';

export default function Index() {
  const activityNow = [
    {
      type: '揪團',
      title: '光復牛肉麵',
      content: '半筋半肉牛肉麵(大碗)',
      money: '300',
    },
    {
      type: '揪團',
      title: '上宇林大安復興店',
      content: '鼎極鮮奶茶',
      money: '300',
    },
    {
      type: '商城',
      title: '三玖水餃',
      content: '鮮蝦水餃x100',
      money: '300',
      time: '2023/07/11',
    },
    {
      type: '商城',
      title: '三玖水餃',
      content: '韭菜水餃x100',
      money: '300',
      time: '2023/07/11',
    },
    {
      type: '外帶',
      title: '鼎泰豐',
      content: '排骨炒飯 + 巧克力鍋',
      money: '300',
      time: '2023/07/11',
    },
    {
      type: '外帶',
      title: '外雙溪釣蝦場',
      content: '極品泰國蝦x35',
      money: '300',
      time: '2023/07/11',
    },
  ];

  const finished = [
    {
      type: '揪團',
      title: '老蔡水煎包1',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
    {
      type: '揪團',
      title: '老蔡水煎包2',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
    {
      type: '揪團',
      title: '老蔡水煎包3',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
    {
      type: '揪團',
      title: '老蔡水煎包4',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
    {
      type: '揪團',
      title: '老蔡水煎包5',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
    {
      type: '揪團',
      title: '老蔡水煎包6',
      content: '高麗菜包x10',
      money: '170',
      time: '2023/07/01',
      score: '4.5',
    },
  ];
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div>
            <div className={styles2.area1}>
              <div className={styles.title}>{'進行中的活動'}</div>
              <div className={styles.scroll}>
                {activityNow.map((v) => {
                  return (
                    <MemAcitvityCard
                      type={v.type}
                      title={v.title}
                      content={v.content}
                      money={v.money}
                      time={v.time}
                      key={v4()}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles2.area2}>
              <div className={styles.title}>{'已完成的活動'}</div>
              <div className={styles.scroll}>
                {finished.map((v) => {
                  return (
                    <MemActivityRecord
                      type={v.type}
                      title={v.title}
                      content={v.content}
                      money={v.money}
                      time={v.time}
                      score={v.score}
                      key={v4()}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
