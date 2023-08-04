import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Forumbtn from '@/components/common/forum/forumbtn';
import styles from './detail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categorykanban from '@/components/common/forum/categorykanban';
import Hotnew from '@/components/common/forum/hotnew';
import Articlelist from '@/components/common/forum/articlelist';
import Newnav from '@/components/common/news/new_nav';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Detail() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const imgPreview = `http://localhost:3002/img/forum/`;

  useEffect(() => {
    const keyword = router.query.forum_keyword || '';

    setSearchKeyword(keyword);
    const usp = new URLSearchParams(router.query);

    fetch(`http://localhost:3002/forum/message?${usp.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        let sortedData = data;

        if (sortOrder === 'asc') {
          sortedData.sort(
            (a, b) => new Date(a.publishedTime) - new Date(b.publishedTime)
          );
        } else if (sortOrder === 'desc') {
          sortedData.sort(
            (a, b) => new Date(b.publishedTime) - new Date(a.publishedTime)
          );
        }

        setArticles(sortedData);
        setTotalPages(Math.ceil(data.length / 10));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [router.query, sortOrder]);

  const sentKeyword = () => {
    router.push(`?forum_keyword=${searchKeyword}`);
  };

  const handleToggleSortOrder = (selectedOrder) => {
    setSortOrder(selectedOrder);
  };

  const handleSortOrderChange = (selectedOrder) => {
    setSortOrder(selectedOrder);
    const queryParams = new URLSearchParams(router.query);
    queryParams.set('forum_orderBy', selectedOrder);
    router.push(`?${queryParams.toString()}`);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className={styles.container}>
        <Newnav />
        <div className={styles.title}>
          <Categorykanban
            keyword={searchKeyword}
            keywordHandler={(e) => {
              setSearchKeyword(e.target.value);
            }}
            handleToggleSortOrder={handleToggleSortOrder}
            sentKeyword={sentKeyword}
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange}
          />
          <Hotnew />
          <Articlelist
            articles={articles.slice((currentPage - 1) * 10, currentPage * 10)}
            imgPreview={imgPreview}
          />
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
      </div>
    </>
  );
}
