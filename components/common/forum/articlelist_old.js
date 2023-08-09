import React, { useEffect, useState, useContext } from 'react';
import styles from './articlelist.module.css';
import { FiHeart } from 'react-icons/fi'; // 空心愛心
import { BiSolidHeart } from 'react-icons/bi'; // 實心愛心
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import { BsBookmarks } from 'react-icons/bs'; // 空心書籤
import { BsBookmarksFill } from 'react-icons/bs'; // 實心書籤
import Link from 'next/link';
import dayjs from 'dayjs';
import AuthContext from '@/context/AuthContext';

import { useRouter } from 'next/router';

export default function Articlelist({
  data = [],
  forum_sid = '',
  imgPreview = '',
  articles = [],
  clickHeartEvent,
  clickCollectEvent,
}) {
  console.log(articles);
  const router = useRouter();
  const [memberCollect, setMemberCollect] = useState([]);
  const [memberLike, setMemberLike] = useState([]);

  return (
    <>
      {articles.map((c, i) => {
        const hasLiked = memberLike.some(
          (item) => item.forum_sid === c.forum_sid
        );
        const hasCollect = memberCollect.some(
          (item) => item.forum_sid === c.forum_sid
        );
        return (
          <div key={c.forum_sid} className={styles.right}>
            <div className={styles.container}>
              <div className={styles.flex}>
                <div className={styles.avatar}>
                  <img
                    src={`http://localhost:3002/img/member/${c.user_photo}`}
                  />
                </div>
                <div className={styles.nickname}>{c.nickname}</div>
                <div className={styles.time}>
                  {dayjs(c.publishedTime).format('YYYY年MM月DD日')}
                </div>
              </div>
              <div className={styles.articlecontainer}>
                <div className={styles.left}>
                  <Link href={`/forum/${c.forum_sid}`}>
                    <div className={styles.title}>{c.header}</div>
                    <div className={styles.ptext}>{c.forum_content}</div>
                  </Link>
                  <div className={styles.flex2}>
                    {!hasLiked ? (
                      <FiHeart
                        className={styles.icon}
                        onClick={(e) => {
                          clickHeartEvent(e, c.forum_sid);
                        }}
                      />
                    ) : (
                      <BiSolidHeart
                        className={styles.icon}
                        onClick={(e) => {
                          clickHeartEvent(e, c.forum_sid);
                        }}
                      />
                    )}
                    <div className={styles.like}>{c.like_count}</div>
                    <BiSolidMessageAltDetail className={styles.message} />
                    <div className={styles.like}>{c.comment_count}</div>
                    {!hasCollect ? (
                      <BsBookmarks
                        onClick={(e) => {
                          clickCollectEvent(e, c.forum_sid);
                        }}
                        className={styles.bookmark}
                      />
                    ) : (
                      <BsBookmarksFill
                        onClick={(e) => {
                          clickCollectEvent(e, c.forum_sid);
                        }}
                        className={styles.bookmark}
                      />
                    )}

                    {/* <BsBookmarksFill className={styles.bookmark} /> */}
                    <div className={styles.like}>收藏</div>
                  </div>
                </div>
                {c.forum_photo && ( // 使用條件渲染來檢查 img 是否為空值
                  <div className={styles.image}>
                    <img
                      src={`${imgPreview + c.forum_photo}`}
                      className={styles.img}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
