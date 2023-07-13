import React from 'react';
import Newnav from '@/components/common/new_nav';
import styles from './news_detailed.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Article from '@/components/common/new_article';
import HotArticle from '@/components/common/hot_article';
import Catalog from '@/components/common/catalog';
export default function NewsDetailed() {
  return (
    <>
      <div className="container">
        <div className="row">
          <Newnav />
          <div className={styles.line}>
            <h1 className={styles.title}>title</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <p className={styles.ptext}>
              醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪醜八怪
            </p>
            <div className={styles.img}>
              <img src="/f_imgs/111.jpg"></img>
              <p className={styles.ptext3}></p>
            </div>
          </div>
          <div className="col-4">
            <Catalog />
            <Article />
            <HotArticle />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
