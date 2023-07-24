import React from 'react';
import Forumbtn from '@/components/common/btn';
import { Style } from '@mui/icons-material';
import styles from './article_datail.module.css';
import TagTime from '@/components/common/forum/tag_time';
import DetailTitle from '@/components/common/forum/detail_title';
import DetailP from '@/components/common/forum/detail_p';
export default function ArticleDetail() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className={styles.top}>
              <Forumbtn />
              <Forumbtn />
              <Forumbtn />
              <Forumbtn />
              <Forumbtn />
              <Forumbtn />
            </div>
          </div>
          <div className="col-10">
            <div className={styles.vatar}></div>
            <div className={styles.ptext}></div>
            <DetailTitle />
            <TagTime />
            <img src="/f_imgs/111.jpg" className={styles.img} />
            <DetailP />
            <DetailP />
            <DetailP />
          </div>
        </div>
      </div>
    </>
  );
}
