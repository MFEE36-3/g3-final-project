import React from 'react';
import styles from './categorykanban.module.css';
import { BiSearch } from 'react-icons/bi';

export default function Categorykanban({
  keyword = '',
  keywordHandler = () => {},
  sentKeyword = () => {},
  handleToggleSortOrder = () => {},
  sortOrder = 'desc',
  sortArticles = () => {},
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avator}>
          <img></img>
        </div>
        <div className={styles.ptext}>食GOEAT! 哈拉區</div>
      </div>
      <button
        onClick={() => {
          handleToggleSortOrder(sortOrder); // 切換排序方式
          sortArticles(); // 重新排序文章列表
        }}
      >
        {sortOrder === 'desc' ? '排序方式：由新到舊' : '排序方式：由舊到新'}
      </button>
      <div className={styles.end}>
        <input
          name="keyword"
          value={keyword}
          type="search"
          placeholder="搜尋文章..."
          aria-label="Search"
          onChange={keywordHandler}
        ></input>
        <button
          className="btn btn-outline-danger"
          type="submit"
          onClick={sentKeyword}
        >
          <BiSearch />
        </button>
      </div>
    </>
  );
}
