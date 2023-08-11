import React, { useEffect, useState, useContext } from 'react';
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
import Swal from 'sweetalert2';
import AuthContext from '@/context/AuthContext';
import Head from 'next/head';

export default function Detail() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const { auth, setAuth } = useContext(AuthContext);
  const [clickHeart, setClickHeart] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // 按讚
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);
  // 收藏
  const [addCollectList, setAddCollectList] = useState([]);
  const [isClickingCollect, setIsClickingCollect] = useState(false);

  const imgPreview = `http://localhost:3002/img/forum/`;
  console.log(articles);
  // 在 Detail 组件的 useEffect 中修改数据获取逻辑
  const limit = 10;
  useEffect(() => {
    setArticles([]);
    const keyword = router.query.forum_keyword || '';

    setSearchKeyword(keyword);

    const usp = new URLSearchParams(router.query);

    fetch(`http://localhost:3002/forum/message?${usp.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.article);
        let sortedData = data.article.map((v) => {
          return { ...v, liked_by_user_id: !!v.liked_by_user_id };
        });
        console.log(data);
        console.log(sortedData);
        // 根據排序顺序進行排序
        if (sortOrder === 'asc') {
          sortedData.sort(
            (a, b) => new Date(a.publishedTime) - new Date(b.publishedTime)
          );
        } else if (sortOrder === 'desc') {
          sortedData.sort(
            (a, b) => new Date(b.publishedTime) - new Date(a.publishedTime)
          );
        }

        // 計算總頁數
        const alllength = data.totalRows;
        console.log(alllength);
        const totalPages = Math.ceil(alllength / limit);
        setTotalPages(totalPages);

        // 根據當前頁碼截取對應的資料片段
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const currentPageData = sortedData.slice(startIndex, endIndex);

        setArticles(currentPageData);
      })
      .catch((error) => console.error('錯誤取得資料:', error));
  }, [router.query, sortOrder, currentPage]);

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
  useEffect(() => {
    // 記住滾動位置
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClearFilter = () => {
    setSearchKeyword(''); // 清除篩選關鍵字
    setSortOrder('desc'); // 重置排序狀態
    setCurrentPage(1); // 重置當前頁碼

    // 更新 URL 並清除篩選參數
    router.replace('/forum');

    // 恢復滾動位置
    window.scrollTo(0, scrollPosition);
  };

  
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (!isClickingLike && addLikeList.length > 0) {
      const member = JSON.parse(localStorage.getItem('auth'));

      if (member?.sid) {
        sendLikeList(addLikeList, member.sid).then(() => {
          //在成功送資料到後端後重置addLikeList
          setAddLikeList([]);
        });
      }
    }
  }, [isClickingLike, addLikeList]);

  // useEffect(() => {
  //   if (!isClickingCollect && addCollectList.length > 0) {
  //     const member = JSON.parse(localStorage.getItem('auth'));
  //     if (member?.sid) {
  //       sendCollectList(addCollectList, member.sid).then(() => {
  //         //在成功送資料到後端後重置addCollectList
  //         setAddCollectList([]);
  //       });
  //     }
  //   }
  // }, [isClickingCollect, addCollectList]);

  // 沒登入會員收藏，跳轉登入

  // const toSingIn = () => {
  //   const from = router.query;
  //   router.push(
  //   `/member/sign-in?from=${
  //   process.env.WEB
  //   }/restaurant/list?${new URLSearchParams(from).toString()}`
  //   );
  //   };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  const clickHeartHandler = (id) => {
    setIsClickingLike(true);
    const timeClick = new Date().getTime();
    const newData = articles.map((v) => {
      if (v.forum_sid === id) {
        const insideInLikeList = addLikeList.find(
          (item) => item.forum_sid === id
        );
        if (insideInLikeList) {
          setAddLikeList((preV) => preV.filter((v2) => v2.forum_sid !== id));
        } else {
          setAddLikeList((preV) => [
            ...preV,
            { forum_sid: id, time: timeClick, clickHeart: !v.liked_by_user_id },
          ]);
        }

        return { ...v, liked_by_user_id: !v.liked_by_user_id };
      } else return { ...v };
    });

    setArticles(newData);

    setTimeout(() => {
      setIsClickingLike(false);
    }, 1500);
  };

  //將資料送到後端
  const sendLikeList = async (arr, id = '') => {
    const res = await fetch(
      `${process.env.API_SERVER}/forum/handle-like-list`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ arr, member_id: id }),
      }
    );
    const data = await res.json();

    if (data.success) {
      console.log(data);
    }
  };
  // // 收藏書籤方法
  // const clickCollectHandler = (id) => {
  //   setIsClickingCollect(true);
  //   const timeClick = new Date().getTime();
  //   const newData = articles.map((v) => {
  //     if (v.forum_sid === id) {
  //       const insideInCollectList = addCollectList.find(
  //         (item) => item.forum_sid === id
  //       );
  //       if (insideInCollectList) {
  //         setAddCollectList((preV) => preV.filter((v2) => v2.forum_sid !== id));
  //       } else {
  //         setAddCollectList((preV) => [
  //           ...preV,
  //           { forum_sid: id, time: timeClick, clickcollect: !v.is_favorite },
  //         ]);
  //       }

  //       return { ...v, is_favorite: !v.is_favorite };
  //     } else return { ...v };
  //   });

  //   setArticles(newData);

  //   setTimeout(() => {
  //     setIsClickingCollect(false);
  //   }, 1500);
  // };
  // //將資料送到後端
  // const sendCollectList = async (arr, id = '') => {
  //   const res = await fetch(
  //     `${process.env.API_SERVER}/forum/handle-collect-list`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ arr, member_id: id }),
  //     }
  //   );
  //   const data = await res.json();

  //   if (data.success) {
  //     console.log(data);
  //   }
  // };

  return (
    <>
      <Head>
        <title>食GOEAT! / 美食論壇</title>
      </Head>
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
            handleClearFilter={handleClearFilter}
          />
          <Hotnew />
          {articles
            .filter((value, index) => currentPage < currentPage + 10)
            .map((article, index) => {
              const {
                comment_count,
                forum_content,
                forum_photo,
                forum_sid,
                header,
                like_count,
                member_sid,
                nickname,
                publishedTime,
                user_photo,
                liked_by_user_id,
                is_favorite,
              } = article;
              return (
                <Articlelist
                  article={article}
                  forum_sid={forum_sid}
                  comment_count={comment_count}
                  forum_content={forum_content}
                  forum_photo={forum_photo}
                  header={header}
                  like_count={like_count}
                  nickname={nickname}
                  publishedTime={publishedTime}
                  user_photo={user_photo}
                  key={index}
                  articles={[article]}
                  imgPreview={imgPreview}
                  likeDatas={likeDatas}
                  is_favorite={is_favorite}
                  liked_by_user_id={liked_by_user_id}
                  clickHeartHandler={clickHeartHandler} // 將按讚事件處理函數傳遞給子元件
                  // clickCollectHandler={clickCollectHandler} // 將收藏事件處理函數傳遞給子元件
                />
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
      </div>
    </>
  );
}
