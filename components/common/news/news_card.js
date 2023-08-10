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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Newscard({ news_sid = '', article = [] }) {
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

  const handlePageChange = (event, newPage) => {
    connect(newPage);
  };

  return (
    <>
    <div className='row m-0' >
      {news.map((v, i) => {
        // 使用 Link 元件作為每個新聞卡片的容器，設定 to 屬性為對應的路由
        return (
          
            <div
              className={`col-sm-12 col-md-4 ${styles.cardbody}`}
              key={v.news_sid}
            >
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
                {/* <Hashtag /> */}
              </Link>
            </div>
          
        );
      })}
      </div>
      <div className="w-100 d-flex justify-content-center mb-5 pb-5 mt-2">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: 25,
              },
              '& .Mui-selected': {
                fontSize: 30,
              },
              '& .MuiPaginationItem-page': {
                minWidth: '50px',
                padding: '7px',
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
}
