import React, { useEffect, useState } from 'react';
import styles from '@/styles/news.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselFadeExample from '../../components/common/news/UncontrolledExample';
import Newscard from '../../components/common/news/news_card';
import Newnav from '../../components/common/news/new_nav';
import UncontrolledExample from '../../components/common/news/UncontrolledExample';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function Demo() {
  const [news, setnews] = useState([]);
  const connect = async (e) => {
    fetch('http://localhost:3002/news/demo')
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        data.rows; // array
        setnews(data.rows);
      });
  };
  console.log(news);
  return (
    <>
      {news.map((v, i) => {
        // 使用 Link 元件將 Newscard 元件包裹起來，設定 to 屬性為對應的路由
        return (
          <Link
            href={`http://localhost:3000/news/${v.news_sid}`}
            key={v.news_sid}
          >
            <div key={i}>{v.header}</div>
          </Link>
        );
      })}
      <div className={`${styles.container}`}>
        <Newnav />
        <h1 className={`${styles.title}`}>美食新聞</h1>
        <div className={`${styles.line1}`}></div>
        <CarouselFadeExample />
        <div>
          <div className={`${styles.line2}`}></div>

          <div className="container">
            <div className="row">
              <Newscard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
