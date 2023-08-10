import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Newnav from '@/components/common/news/new_nav';
import styles from './news_detailed.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Article from '@/components/common/news/new_article';
import HotArticle from '@/components/common/news/hot_article';
import Catalog from '@/components/common/news/catalog';
import Head from 'next/head';
export default function NewsDetailed() {
  const { query } = useRouter();
  const router = useRouter();
  const [article, setArticle] = useState({});
  const imgPreview = `http://localhost:3002/img/news_photo/`;

  useEffect(() => {
    const { pid } = query;
    if (pid) {
      fetch(`http://localhost:3002/news/news/${pid}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setArticle(data);
        });
    }
  }, [query]);

  return (
    <>
     <Head>
            <title>食GOEAT! / 美食論壇</title>
        </Head>
      <div className={styles.container}>
        <Newnav />
        <div className={styles.line}>
          {article.length > 0 && (
            <h1 className={styles.title}>{article[0].header}</h1>
          )}
        </div>

        <div className="row">
          <div className="col-12 col-md-8">
            {article.length > 0 && (
              <div className={styles.time}>{article[0].publishedTime}</div>
            )}
            {article.length > 0 && (
              <p className={styles.ptext}>{article[0].content}</p>
            )}
            <div className={styles.img}>
              {article.length > 0 && (
                <img
                  src={`${imgPreview + article[0].photo}`}
                  alt="文章圖片"
                ></img>
              )}
              <p className={styles.ptext3}></p>
            </div>
          </div>
          <div className="col-12 col-md-4 d-none d-md-block">
            <Catalog />
            <Article className={styles.top} />
            <HotArticle className={styles.top} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
