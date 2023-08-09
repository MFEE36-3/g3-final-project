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

  const { auth } = useContext(AuthContext);
  const [clickHeart, setClickHeart] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  // 按讚及收藏 方法
  const [sendLike, setSendLike] = useState({
    member_id: auth.sid,
    clickHeart: false,
    article_sid: '',
  });
  const [clickCollect, setclickCollect] = useState(false);
  const [sendCollect, setSendCollect] = useState({
    // member_id: auth.sid ? auth.sid : '',
    member_id: '',
    clickCollect: false,
    article_sid: '',
  });
  const getMemberIdForHeart = () => {
    setSendLike({ ...sendLike, member_id: auth.sid });
  };

  const getMemberIdForCollect = () => {
    setSendCollect({ ...sendCollect, member_id: auth.sid });
  };

  // 網頁一進入就抓取會員按過哪些文章讚
  useEffect(() => {}, []);

  // 設置一個接住會員按讚的狀態
  const [memberCollect, setMemberCollect] = useState([]);
  const [memberLike, setMemberLike] = useState([]);
  useEffect(() => {
    if (auth.account) {
      getMemberIdForHeart();
      getMemberIdForCollect();
      fetch(process.env.API_SERVER + '/forum/get-member-like', {
        method: 'POST',
        body: JSON.stringify(auth),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setMemberLike(data);
        });
      fetch(process.env.API_SERVER + '/forum/get-member-collect', {
        method: 'POST',
        body: JSON.stringify(auth),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setMemberCollect(data);
        });
    }
  }, [auth.account]);

  console.log(memberLike);
  console.log(memberCollect);

  useEffect(() => {
    // 在這裡處理後續程式碼，這裡的sendLike.article_sid將獲得最新值
    console.log('最新的 article_sid:', sendLike.article_sid);

    // 在這裡執行後續程式碼
    if (sendLike.article_sid) {
      fetch(process.env.API_SERVER + '/forum/handle-like-list', {
        method: 'POST',
        body: JSON.stringify(sendLike),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [sendLike.article_sid, sendLike.clickHeart]);

  const clickHeartEvent = async (e, article_sid) => {
    if (auth.account) {
      console.log('有帳號');
      e.preventDefault();
      setClickHeart(!clickHeart); 
      setSendLike((prevSendLike) => ({
        ...prevSendLike,
        article_sid: article_sid,
        clickHeart: !clickHeart,
      }));
    } else {
      console.log('沒有帳號');
      Swal.fire({
        title: '您尚未登入',
        text: '需要登入即可按喜歡！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: '登入',
        cancelButtonText: '取消登入',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        } else {
        }
      });
    }
  };

  // 收藏:會員點擊即收藏文章()
  const clickCollectEvent = async (e, article_sid) => {
    if (auth.account) {
      e.preventDefault();
      const newClickCollect = !clickCollect; // 计算新的 clickCollect 状态
      setclickCollect(newClickCollect); // 设置新的 clickCollect 状态
      setSendCollect((prevSendCollect) => ({
        ...prevSendCollect,
        article_sid: article_sid,
        clickCollect: newClickCollect,
      }));
    } else {
      console.log('沒有帳號');
      Swal.fire({
        title: '您尚未登入',
        text: '需要登入即可按喜歡！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '登入',
        cancelButtonText: '取消登入',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        } else {
        }
      });
    }
  };

  // 發送新增或刪除收藏的api
  useEffect(() => {
    // 在這裡處理後續程式碼，這裡的sendLike.article_sid將獲得最新值
    console.log('最新的 article_sid:', sendCollect.article_sid);

    // 在這裡執行後續程式碼
    if (sendCollect.article_sid) {
      console.log('成功發送');
      fetch(process.env.API_SERVER + '/forum/handle-collect-list', {
        method: 'POST',
        body: JSON.stringify(sendCollect),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          getMemberIdForCollect(data);
        });
    }
  }, [sendCollect.article_sid, sendCollect.clickCollect]);
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
            clickCollectEvent={clickCollectEvent}
            clickHeartEvent={clickHeartEvent}
            memberLike={memberLike}
            memberCollect={memberCollect}
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
