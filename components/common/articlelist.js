import React from 'react';
import styles from './articlelist.module.css';
import { BsSuitHeartFill } from 'react-icons/bs';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
export default function Articlelist() {
  return (
    <>
      <div className={styles.right}>
        <div>
          <div className={styles.flex}>
            <div className={styles.avatar}></div>
            <div className={styles.nickname}>超級會吃大胃王</div>
          </div>
          <div className={styles.title}>
            鐵砂半發財車餡餅！金黃爆汁超邪惡！新竹銅板價美食
          </div>
          <div className={styles.ptext}>
            餡餅口味有甜有鹹，有豬肉、高麗菜、蘿蔔絲和紅豆四種。蘿蔔絲餅還挺搶手的，這天下午前來，蘿蔔絲餅就已經完售了...
          </div>
          <div className={styles.flex2}>
            <BsSuitHeartFill className={styles.icon} />
            <div className={styles.like}>777</div>
            <BiSolidMessageAltDetail className={styles.message} />
            <div className={styles.like}>留言數</div>
            <FaRegBookmark className={styles.bookmark} />
            <div className={styles.like}>收藏</div>
          </div>
        </div>
        <div>
          <img src="/f_imgs/111.jpg" className={styles.img} />
        </div>
      </div>
    </>
  );
}
