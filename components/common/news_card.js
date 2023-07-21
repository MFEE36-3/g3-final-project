import React, { useEffect, useState } from 'react';
import styles from './news_card.module.css';
import Hashtag from './hashtag';
import styled from '@emotion/styled';
import Link from 'next/link';
export default function Newscard() {
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
        return (
          <div className={`col-4 ${styles.cardbody}`} key={v.news_sid}>
            <div className={styles.card}>
              <img src={`${imgPreview + v.photo}`} className={styles.img} />
            </div>
            <Link href={`/`}> <p className={styles.ptext}>{v.header}</p> </Link>
            <Hashtag />
          </div>
        );
      })}

      <div className={styles.pagination}>
        <button
          className="btn btn-secondary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          上一頁
        </button>
        <span>{currentPage}</span>
        <button
          className="btn btn-secondary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          下一頁
        </button>
      </div>
    </>
  );
}
