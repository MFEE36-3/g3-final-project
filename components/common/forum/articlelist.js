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
  // const [articles, setArticles] = useState([]);
  // const [sortOrder, setSortOrder] = useState('desc'); // 初始排序方式，默认为降序
  // const imgPreview = `http://localhost:3002/img/forum/`;

  // useEffect(() => {
  //   fetch('http://localhost:3002/forum/detail')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const sortedData = sortArticles(data, sortOrder);
  //       setArticles(sortedData);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, [sortOrder]);
  // const handleToggleSortOrder = () => {
  //   setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  // };

  // const sortArticles = (data, order) => {
  //   return data.sort((a, b) => {
  //     if (order === 'asc') {
  //       return new Date(a.publishedTime) - new Date(b.publishedTime);
  //     } else {
  //       return new Date(b.publishedTime) - new Date(a.publishedTime);
  //     }
  //   });
  // };
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
          <div>
            <Link href={`/forum/${c.forum_sid}`}>
              <img src={`${imgPreview + c.photo}`} className={styles.img} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
