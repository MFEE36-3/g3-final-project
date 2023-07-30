import React from 'react';
import styles from './catalog.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Catalog() {
  const [article, setArticle] = useState([]);

  const connect = async () => {
    fetch('http://localhost:3002/news2/rand2')
      .then((r) => r.json())
      .then((data) => {
        setArticle(data);
        console.log(data);
      });
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.after}>
        <div className={styles.line}></div>
          {article.map((v) => (
            <div key={v.news_sid}>
              <Link href={`/news/${v.news_sid}`}>
                <p className={styles.pline}>{v.header}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
