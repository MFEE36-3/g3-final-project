import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-collect.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemCollectBlog from '@/components/common/member/mem-collectBlog';
import { v4 } from 'uuid';
import { useState } from 'react';

export default function Index() {
  const ListForum = [
    {
      type: '閒聊',
      title: '有人喝過上宇林的鼎極鮮奶茶嗎?',
      time: '2023/07/08',
    },
    {
      type: '推薦',
      title: '內湖的黃老師母便當，在地隱藏美食',
      time: '2023/06/24',
    },
    {
      type: '踩雷',
      title: '快崩潰了，到底誰會想吃阿得餐盒???',
      time: '2023/04/29',
    },
  ];

  const ListStore = [
    {
      type: '外帶',
      title: '鼎泰豐小籠包',
      time: '2023/07/08',
    },
    {
      type: '內用',
      title: '能量先生',
      time: '2023/06/24',
    },
    {
      type: '外帶',
      title: '人从眾牛排',
      time: '2023/04/29',
    },
  ];

  const ListMarket = [
    {
      type: '高露潔官方',
      title: '高露潔牙線x8',
      time: '2023/07/08',
    },
    {
      type: '鬍鬚張魯肉飯',
      title: '冷凍粹魯',
      time: '2023/06/24',
    },
    {
      type: '刁民酸菜魚',
      title: '刁民麻辣鍋',
      time: '2023/04/29',
    },
  ];

  const [list, setList] = useState(ListForum);

  const changeList1 = () => {
    setList(ListForum);
  };

  const changeList2 = () => {
    setList(ListStore);
  };

  const changeList3 = () => {
    setList(ListMarket);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.area1}>
            <div className={styles.title}>{'我的文章'}</div>
            <div className={styles.scroll}>
              {ListForum.map((v) => {
                return (
                  <MemCollectBlog
                    type={v.type}
                    title={v.title}
                    time={v.time}
                    key={v4()}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles2.area2}>
            <div className={styles.title}>{'我的收藏'}</div>
            <div className={styles.scroll}>
              <div
                className={styles2.scrollArea}
                style={{ boxShadow: '0px 5px 2px rgba(123, 123, 123, 0.5)' }}
              >
                <button className={styles2.scrollTitle} onClick={changeList1}>
                  論壇貼文
                </button>
                <button className={styles2.scrollTitle} onClick={changeList2}>
                  訂位/外帶店家
                </button>
                <button className={styles2.scrollTitle} onClick={changeList3}>
                  商城商品
                </button>
              </div>
              <div>
                {list.map((v) => {
                  return (
                    <MemCollectBlog
                      type={v.type}
                      title={v.title}
                      time={v.time}
                      key={v4()}
                    />
                  );
                })}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
