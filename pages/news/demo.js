import React from 'react'
import styles from '@/styles/news.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselFadeExample from '../../components/common/carousels';

export default function Demo() {
  return (
    <>
    <CarouselFadeExample />
      <div className={`${styles.breadcontainer}`}>
      <p>...</p>
      <div className={`${styles.bread}`}>最新文章</div>
      </div>
     
      <div className={`${styles.container}`}>
        <h1 className={`${styles.title}`}>即時新聞</h1>
        <div className={`${styles.line1}`}></div>
      </div>
      <header>
        <div>
          <div>
            <div>
              <img src="#" alt="#" />
            </div>
            <div>
              <img src="#" alt="#" />
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <button type="button">
            <sapn></sapn>
            <sapn></sapn>
          </button>
          <button type="button">
            <sapn></sapn>
            <sapn></sapn>
          </button>
        </div>
      </header>
      <div>
        <div className={`${styles.frame}`}>
          <div className={`${styles.box}`}>即時新聞</div>
          <div className={`${styles.box}`}>美食</div>
          <div className={`${styles.box}`}>旅遊</div>
          <div className={`${styles.box}`}>娛樂</div>
          <div className={`${styles.box}`}>生活</div>
        </div>
        <div>我4紅線</div>
      </div>
    </>
  )
}
