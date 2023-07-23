import React from 'react';
import styles from './new_article.module.css';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import Link from 'next/link'; // 將Link元素導入

export default function Article() {
  const [article, setArticle] = useState([]);
  const [random, setRandom] = useState();

  const imgPreview = `http://localhost:3002/img/news_photo/`;

  const connect = async (e) => {
    fetch('http://localhost:3002/news2/rand')
      .then((r) => r.json())
      .then((data) => {
        // data.rows; // array
        setArticle(data);
        console.log(data);
      });
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div className={styles.pad}>
        <div className={styles.container}>
          <p>最新文章</p>
        </div>
        {article.map((v) => (
          <Link href={`/news/${v.news_sid}`} key={v.news_sid}>
            <p className={styles.ptext2}>{v.header}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
