import React from 'react';
import styles from './catalog.module.css';
import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
export default function Catalog() {
  const [article, setArticle] = useState([]);
  const [random, setRandom] = useState();

  const imgPreview = `http://localhost:3002/img/news_photo/`;
  const connect = async (e) => {
    fetch('http://localhost:3002/news/article')
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        console.log(data.randomData[0]);
        // data.rows; // array
        setArticle(data.rows);
        setRandom(data.randomData[0]);
      });
  };
  useEffect(() => {
    // 此處可以放置想要在random狀態更新時執行的程式碼

    console.log(random);
  }, [random]);

  useEffect(() => {
    connect();
  }, []);
  const title = article.map((v) => v.header);
  const random_title = shuffle(title);

  // 隨機選擇一筆資料
  const randomItem =
    random_title[Math.floor(Math.random() * random_title.length)];
  const randomItem2 =
    random_title[Math.floor(Math.random() * random_title.length)];

  console.log(random_title);
  console.log(randomItem);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.after}>
          <p className={styles.pline}>{randomItem}</p>
          <p className={styles.pline2}>{randomItem2}</p>
        </div>
      </div>
    </>
  );
}
