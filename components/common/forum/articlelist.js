import React, { useEffect, useState, useContext } from 'react';
import styles from './articlelist.module.css';
import { FiHeart } from 'react-icons/fi';
import { BiSolidHeart } from 'react-icons/bi';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
import { BsBookmarksFill } from 'react-icons/bs';
import Link from 'next/link';
import dayjs from 'dayjs';
import AuthContext from '@/context/AuthContext';

import { useRouter } from 'next/router';

export default function Articlelist({
  liked_by_user_id,
  is_favorite,
  collect = false,
  comment_count,
  forum_content,
  forum_photo,
  header,
  like_count,
  nickname,
  publishedTime,
  user_photo,
  clickHeartHandler,
  forum_sid,
  clickCollectHandler,
}) {
  const router = useRouter();

  return (
    <div key={forum_sid} className={styles.right}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.avatar}>
            <img src={`http://localhost:3002/img/member/${user_photo}`} />
          </div>
          <div className={styles.nickname}>{nickname}</div>
          <div className={styles.time}>
            {dayjs(publishedTime).format('YYYY年MM月DD日')}
          </div>
        </div>
        <div className={styles.articlecontainer}>
          <div className={styles.left}>
            <Link href={`/forum/${forum_sid}`}>
              <div className={styles.title}>{header}</div>
              <div className={styles.ptext}>{forum_content}</div>
            </Link>
            <div className={styles.flex2}>
              {liked_by_user_id ? (
                <div className={styles.likeContainer}>
                  <BiSolidHeart
                    className={styles.icon}
                    onClick={(e) => {
                      clickHeartHandler(forum_sid);
                    }}
                  />
                  <div className={styles.like}>喜歡</div>
                </div>
              ) : (
                <div className={styles.likeContainer}>
                  <FiHeart
                    className={styles.icon}
                    onClick={(e) => {
                      clickHeartHandler(forum_sid);
                    }}
                  />
                  <div className={styles.like}>不喜歡</div>
                </div>
              )}
              <BiSolidMessageAltDetail className={styles.message} />
              <div className={styles.like}>{comment_count}</div>
              {is_favorite ? (
                <BsBookmarksFill
                  onClick={(e) => {
                    clickCollectHandler(forum_sid);
                  }}
                  className={styles.bookmark}
                />
              ) : (
                <BsBookmarks
                  onClick={(e) => {
                    clickCollectHandler(forum_sid);
                  }}
                  className={styles.bookmark}
                />
              )}
              {is_favorite ? (
                <div className={styles.like}>收藏</div>
              ) : (
                <div className={styles.like}>未收藏</div>
              )}
            </div>
          </div>
          {forum_photo && ( // 判斷是否有照片，若有則渲染照片
            <div className={styles.image}>
              <img
                src={`http://localhost:3002/img/forum/${forum_photo}`}
                className={styles.img}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
