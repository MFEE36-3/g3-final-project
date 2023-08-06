import React, { useEffect, useState, useContext } from 'react';
import styles from './articlelist.module.css';
import { FiHeart } from 'react-icons/fi'; // 空心愛心
import { BiSolidHeart } from 'react-icons/bi'; // 實心愛心
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import { BsBookmarks } from 'react-icons/bs'      // 空心書籤
import { BsBookmarksFill } from 'react-icons/bs'  // 實心書籤
import Link from 'next/link';
import dayjs from 'dayjs';
import AuthContext from '@/context/AuthContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Articlelist({
  data = [],
  forum_sid = '',
  imgPreview = '',
  articles = [],
}) {
  console.log(articles);
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const [clickHeart, setClickHeart] = useState(false);
  const [sendLike, setSendLike] = useState({
    member_id: auth.sid,
    clickHeart: false,
    article_sid: '',
  });

  const [clickCollect, setclickCollect] = useState(false)
  const [sendCollect, setSendCollect] = useState({
    // member_id: auth.sid ? auth.sid : '',
    member_id: '',
    clickCollect: false,
    article_sid: '',
  })

  const getMemberIdForHeart = () => {
    setSendLike({ ...sendLike, member_id: auth.sid });
  };

  const getMemberIdForCollect = () => {
    setSendCollect({ ...sendCollect, member_id: auth.sid })
  }

  // 網頁一進入就抓取會員按過哪些文章讚
  useEffect(() => { }, []);

  // 設置一個接住會員按讚的狀態
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
    }
  }, [auth]);

  console.log(memberLike);

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

  // 收藏:會員點擊即收藏文章()
  const clickCollectEvent = async (e, article_sid) => {
    if (auth.account) {
      console.log('有帳號');
      e.preventDefault();
      setclickCollect(!clickCollect)
      setSendCollect((prevSendCollect) => ({
        ...prevSendCollect,
        article_sid: article_sid,
        clickCollect: !clickCollect,
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
      console.log('成功發送')
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
        });
    }
  }, [sendCollect.article_sid, sendCollect.clickCollect]);



  return (
    <>

      {articles.map((c, i) => {
        const hasLiked = memberLike.some(
          (item) => item.forum_sid === c.forum_sid
        );
        return (
          <div key={c.forum_sid} className={styles.right}>
            <div className={styles.container}>
              <div className={styles.flex}>
                <div className={styles.avatar}>
                  <img
                    src={`http://localhost:3002/img/member/${c.user_photo}`}
                  />
                </div>
                <div className={styles.nickname}>{c.nickname}</div>
                <div className={styles.time}>
                  {dayjs(c.publishedTime).format('YYYY年MM月DD日')}
                </div>
              </div>

              <div className={styles.articlecontainer}>
                <div className={styles.left}>
                  <Link href={`/forum/${c.forum_sid}`}>
                    <div className={styles.title}>{c.header}</div>
                    <div className={styles.ptext}>{c.forum_content}</div>
                  </Link>


                  <div className={styles.flex2}>
                    {sendLike.clickHeart === false ? (
                      <FiHeart
                        className={styles.icon}
                        onClick={(e) => {
                          clickHeartEvent(e, c.forum_sid);
                        }}
                      />
                    ) : (
                      <BiSolidHeart
                        className={styles.icon}
                        onClick={(e) => {
                          clickHeartEvent(e, c.forum_sid);
                        }}
                      />
                    )}
                    <div className={styles.like}>{c.like_count}</div>
                    <BiSolidMessageAltDetail className={styles.message} />
                    <div className={styles.like}>{c.comment_count}</div>

                    {sendCollect.clickCollect ?
                      <BsBookmarksFill
                        onClick={(e) => {
                          clickCollectEvent(e, c.forum_sid)
                        }}
                        className={styles.bookmark} />
                      :
                      <BsBookmarks
                        onClick={(e) => {
                          clickCollectEvent(e, c.forum_sid)
                        }}
                        className={styles.bookmark} />}


                    {/* <BsBookmarksFill className={styles.bookmark} /> */}
                    <div className={styles.like}>收藏</div>
                  </div>
                </div>
                {c.forum_photo && ( // 使用條件渲染來檢查 img 是否為空值
                  <div className={styles.image}>
                    <img
                      src={`${imgPreview + c.forum_photo}`}
                      className={styles.img}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        );
      })}
    </>
  );
}
