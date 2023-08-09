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

export default function Detail() {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const [clickHeart, setClickHeart] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // 蒐藏按讚
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);
  const imgPreview = `http://localhost:3002/img/forum/`;



  useEffect(() => {
    const keyword = router.query.forum_keyword || '';

    setSearchKeyword(keyword);
    const usp = new URLSearchParams(router.query);

    fetch(`http://localhost:3002/forum/message?${usp.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        // let sortedData = data;
        let sortedData = data.map((v) => {
          return { ...v, liked_by_user_id: !!v.liked_by_user_id };
        });
        console.log(sortedData);
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
  // 按讚及收藏 方法
  const getLikeList = async (token = '') => {
    const res = await fetch(`${process.env.API_SERVER}/forum/show-like`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await res.json();
    // console.log(data);

    if (data.likeDatas.length > 0) {
      setLikeDatas(data.likeDatas);
    }
    console.log(likeDatas);
  };

  useEffect(() => {
    if (!isClickingLike && addLikeList.length > 0) {
      const member = JSON.parse(localStorage.getItem('auth'));
      
      sendLikeList(addLikeList, member.sid).then(() => {
        //在成功送資料到後端後重置addLikeList
        setAddLikeList([]);
      });
    }
  }, [isClickingLike, addLikeList]);

  //沒登入會員收藏，跳轉登入

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
            { forum_sid: id, time: timeClick ,clickHeart:!v.liked_by_user_id},
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
        body: JSON.stringify({arr,member_id:id }),
      }
    );
    const data = await res.json();

    if (data.success) {
      console.log(data);
    }
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
          {articles.map((article, index) => {
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
            } = article;
            return (
              <Articlelist
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
                liked_by_user_id={liked_by_user_id}
                clickHeartHandler={clickHeartHandler} // 將按讚事件處理函數傳遞給子元件
                // clickCollectEvent={clickHeartHandler} // 將收藏事件處理函數傳遞給子元件
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
