import React, { useEffect, useState } from 'react';
import styles from './news_card.module.css';
import Hashtag from './hashtag';
import styled from '@emotion/styled';
import Link from 'next/link';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Newscard({ news_sid = '', article = [] }) {
  // 將 article 作為 prop 傳遞進來
  const Btn = styled.button`
    background: var(--main-color);
  `;
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const imgPreview = `http://localhost:3002/img/news_photo/`;

  const connect = async (page) => {
    fetch(`http://localhost:3002/news/demo?page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        setNews(data.rows);
        setTotalPages(data.totalPages);
        setCurrentPage(page);
      });
  };

  useEffect(() => {
    connect(1);
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      connect(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      connect(currentPage + 1);
    }
  };

  return (
    <>
      {news.map((v, i) => {
        // 使用 Link 元件作為每個新聞卡片的容器，設定 to 屬性為對應的路由
        return (
          <div className={`col-sm-12 col-md-4 ${styles.cardbody}`} key={v.news_sid}>
            <Link href={`/news/${v.news_sid}`}>
              <div className={styles.card}>
                <img src={`${imgPreview + v.photo}`} className={styles.img} />
              </div>
              <div className={styles.line}>
                <p className={styles.ptext}>{v.header}</p>
                {/* 使用 dayjs 來格式化時間 */}
                <div className={styles.time}>
                  {dayjs(v.publishedTime).format('YYYY-MM-DD')}
                </div>
              </div>
              <Hashtag />
            </Link>
          </div>
        );
      })}
      <div className={styles.flex}>
        <div className={styles.arrayleft}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
        </div>
        <span className={styles.number}>{currentPage}</span>
        <div className={styles.arrayright}>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </>
  );
}
