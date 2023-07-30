import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Forumbtn from '@/components/common/forum/forumbtn';
import styles from './detail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categorykanban from '@/components/common/forum/categorykanban';
import Hotnew from '../../components/common/forum/hotnew';
import Articlelist from '@/components/common/forum/articlelist';
import Newnav from '@/components/common/news/new_nav';
export default function Detail() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const imgPreview = `http://localhost:3002/img/forum/`;

  useEffect(() => {
    const keyword = router.query.forum_keyword;
    console.log('Keyword:', keyword);
    setSearchKeyword(keyword || '');

    const usp = new URLSearchParams(router.query);
    console.log(usp.toString());

    fetch(`http://localhost:3002/forum/detail?${usp.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = sortArticles(data, sortOrder);
        setArticles(sortedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
    console.log(keyword);
  }, [router.query]);

  const sentKeyword = () => {
    router.push(`?forum_keyword=${searchKeyword}`);
  };

  const handleToggleSortOrder = (selectedOrder) => {
    setSortOrder(selectedOrder);
  };
  const handleSortOrderChange = (selectedOrder) => {
    setSortOrder(selectedOrder);
    // 在這裡重新排序文章列表
    setArticles(sortArticles(articles, selectedOrder));
  };

  const sortArticles = (data, order) => {
    return data.sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.publishedTime) - new Date(b.publishedTime);
      } else {
        return new Date(b.publishedTime) - new Date(a.publishedTime);
      }
    });
  };

  return (
    <>
      <div className={styles.container}>
        <Newnav />
        <div className={styles.category}>
          <Forumbtn />
        </div>
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
          <Articlelist articles={articles} imgPreview={imgPreview} />
        </div>
      </div>
    </>
  );
}
