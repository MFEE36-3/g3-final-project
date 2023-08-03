import React, { useEffect, useState } from 'react';
import styles from './articlelist.module.css';
import { BsSuitHeartFill } from 'react-icons/bs';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';

export default function Articlelist({
  data = [],
  forum_sid = '',
  imgPreview = '',
  articles = [],
}) {
  const [messageCounts, setMessageCounts] = useState({});

  return (
    <>
      {articles.map((c, d) => (
        <div key={c.forum_sid} className={styles.right}>
          <div className={styles.container}>
            <div className={styles.flex}>
              <div className={styles.avatar}>
                <img src={`http://localhost:3002/img/member/${c.user_photo}`} />
              </div>
              <div className={styles.nickname}>{c.nickname}</div>
              <div>{}</div>
            </div>
            <Link href={`/forum/${c.forum_sid}`}>
              <div className={styles.articlecontainer}>
                <div className={styles.left}>
                  <div className={styles.title}>{c.header}</div>
                  <div className={styles.ptext}>{c.forum_content}</div>
                </div>
                <div className={styles.image}>
                  <img
                    src={`${imgPreview + c.forum_photo}`}
                    className={styles.img}
                  />
                </div>
              </div>
            </Link>
            <div className={styles.flex2}>
              <BsSuitHeartFill className={styles.icon} />
              <div className={styles.like}>{c.like_count}</div>
              <BiSolidMessageAltDetail className={styles.message} />
              <div className={styles.like}>{c.comment_count}</div>
              <FaRegBookmark className={styles.bookmark} />
              <div className={styles.like}>收藏</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
