import React from 'react';
import styles from '@/styles/news.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselFadeExample from '../../components/common/carousels';
import Newscard from '../../components/common/news_card';
import Newnav from '@/components/common/new_nav';
export default function Demo() {
  return (
    <>
      <div className={`${styles.container}`}>
      <Newnav/>
        <h1 className={`${styles.title}`}>美食新聞</h1>
        <div className={`${styles.line1}`}></div>
        <CarouselFadeExample />
        <div>
          <div className={`${styles.line1}`}></div>
          <div>
            <div className={styles.flex}>
              <Newscard />
              <Newscard />
              <Newscard />
              <Newscard />
            </div>
            <div className={styles.flex}>
              <Newscard />
              <Newscard />
              <Newscard />
              <Newscard />
            </div>
            <div className={styles.flex}>
              <Newscard />
              <Newscard />
              <Newscard />
              <Newscard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
