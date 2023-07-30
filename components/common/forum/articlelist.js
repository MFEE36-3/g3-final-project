import React, { useEffect, useState } from 'react';
import styles from './articlelist.module.css';
import { BsSuitHeartFill } from 'react-icons/bs';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';

export default function Articlelist({
  forum_sid = '',
  imgPreview = '',
  articles = [],
}) {
  return (
    <>
      {articles.map((c, d) => (
        <div key={c.forum_sid} className={styles.right}>
          <div>
            <div className={styles.flex}>
              <div className={styles.avatar}></div>
              <div className={styles.nickname}>Heads</div>
            </div>
            <Link href={`/forum/${c.forum_sid}`}>
              <div className={styles.title}>{c.header}</div>
              <div className={styles.ptext}>{c.content}</div>
            </Link>
            <div className={styles.flex2}>
              <BsSuitHeartFill className={styles.icon} />
              <div className={styles.like}>愛心</div>
              <BiSolidMessageAltDetail className={styles.message} />
              <div className={styles.like}>留言</div>
              <FaRegBookmark className={styles.bookmark} />
              <div className={styles.like}>收藏</div>
            </div>
          </div>
          <div className={styles.image}>
            <Link href={`/forum/${c.forum_sid}`}>
              <img src={`${imgPreview + c.photo}`} className={styles.img} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
