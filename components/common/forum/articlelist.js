import React, { useEffect, useState } from 'react';
import styles from './articlelist.module.css';
import { BsSuitHeartFill } from 'react-icons/bs';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';

export default function Articlelist({ forum_sid = '', article = [] }) {
  const [articles, setArticles] = useState([]);
  const imgPreview = `http://localhost:3002/img/forum/`
  // const [forum_sid , publishedTime , header ,content , photo]= v;
  useEffect(() => {
    fetch('http://localhost:3002/forum/detail')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        console.log(data); // 在這裡使用 console.log(data)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <>
      {articles.map((article) => (
        <div key={article.id} className={styles.right}>
          <div>
            <div className={styles.flex}>
              <div className={styles.avatar}></div>
              <div className={styles.nickname}>{article.author}</div>
            </div>
            <div className={styles.title}>{article.header}</div>
            <div className={styles.ptext}>{article.content}</div>
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
            <img src={`${imgPreview + article.photo}`} className={styles.img} />
          </div>
        </div>
      ))}
    </>
  );
}
