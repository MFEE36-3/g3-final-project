import React from 'react';
import styles from './categorykanban.module.css';
import { BiSearch } from 'react-icons/bi';

export default function Categorykanban({
  keyword = '',
  keywordHandler = () => {},
  sentKeyword = () => {},
  sortOrder = 'desc',
  handleSortOrderChange = () => {},
  handleClearFilter,
}) {
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.ptext}>食GOEAT! 哈拉區</div>
      </div>
      <div className={styles.end}>
        <button onClick={handleClearFilter} className={styles.btnclear}>
          清除篩選
        </button>
      </div>
      <div className={styles.end}>
        <select
          className={styles.border}
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)} // 綁定 onChange 事件
        >
          <option>--排序方式--</option>
          <option value="asc">由舊到新</option>
          <option value="desc">由新到舊</option>
        </select>
      </div>
      <div className={styles.end}>
        <input
          className={styles.inputBox}
          name="keyword"
          value={keyword}
          type="search"
          placeholder="搜尋文章..."
          aria-label="Search"
          onChange={keywordHandler}
        ></input>
        <button className={styles.btn} type="submit" onClick={sentKeyword}>
          <BiSearch />
        </button>
      </div>
    </>
  );
}
