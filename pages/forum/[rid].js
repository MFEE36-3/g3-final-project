import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './article_datail.module.css';
import TagTime from '@/components/common/forum/tag_time';
import DetailTitle from '@/components/common/forum/detail_title';
import DetailP from '@/components/common/forum/detail_p';
import Newnav from '@/components/common/news/new_nav';
import AuthContext from '@/context/AuthContext';
import Message from '@/components/common/forum/message';
import MessageInput from '@/components/common/forum/messageinput';
import Swal from 'sweetalert2';
import Head from 'next/head';
export default function ArticleDetail() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { query } = router;
  const [article, setArticle] = useState([]);
  const [messages, setMessages] = useState([]);
  const imgPreview = `http://localhost:3002/img/forum/`;
  const [forum, setforum] = useState([]);
  console.log(forum);
  useEffect(() => {
    console.log(query);
    const { rid } = query;

    if (rid) {
      fetch(`http://localhost:3002/forum/forum/${rid}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(data);

          const { forum_data, messageData } = data;
          setArticle(data);
          setMessages(messageData);
          console.log(messageData);
          console.log(forum_data);
          if (forum_data[0].forum_sid) {
            setforum(forum_data);
          }

          console.log(messageData);

          if (messageData && messageData.length > 0) {
            setMessages(messageData);
          }
          if (forum_data && forum_data.length > 0) {
            setArticle(...forum_data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [query]);
  console.log(message);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('送出訊息:', message);
    setReplay('');
  };

  const handleChange = (e) => {
    setReplay(e.target.value);
  };
  const { auth } = useContext(AuthContext);

  const [comment_content, setComment_Content] = useState('');

  // 從後端資料庫拿到使用者的大頭貼
  const [userPhoto, setUserPhoto] = useState({
    user_id: '',
    user_photo: '',
  });

  // 發送留言到後端資料庫的物件:
  const [sendMessage, setSendMessage] = useState({
    member_id: '',
    content: '',
    forum_sid: '',
  });

  useEffect(() => {
    if (messages.length && messages[0].forum_sid) {
      setSendMessage({ ...sendMessage, forum_sid: messages[0].forum_sid });
    }
  }, [messages]);

  useEffect(() => {
    if (auth.account) {
      setSendMessage({
        ...sendMessage,
        member_id: auth.sid,
        // forum_sid:messages.forum_sid
      });

      fetch(process.env.API_SERVER + '/forum/getUserPhoto', {
        method: 'POST',
        body: JSON.stringify(auth),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setUserPhoto({
            ...userPhoto,
            user_id: data.sid,
            user_photo: data.photo,
          });
        });
    }
  }, [auth]);

  // 將留言內容加到要傳送到後端的物件狀態
  const handleAddContent = (e) => {
    setSendMessage({ ...sendMessage, [e.target.name]: e.target.value });
  };

  // 留言新增函式
  // const handlecontent = (e) => {
  //   console.log('content');
  //   setComment_Content(e.target.value);
  // };
  // const handlemessagepost = async (e) => {
  //   console.log('yes');
  //   e.preventDefault();
  //   const postData = {
  //     comment_content: comment_content,
  //     user_id: null,
  //     // forum_data: forum[0].forum_sid,
  //     forum_sid: '',
  //   };
  //   try {
  //     const response = await fetch('http://localhost:3002/forum/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ ...postData, forum_sid: forum[0].forum_sid }),
  //     })
  //       .then((r) => r.json())
  //       .then((data) => console.log(data));
  //     const data = await response.json();
  //     if (data.success) {
  //       // 文章新增成功，你可以在這裡做任何你想要的處理
  //       //console.log('留言新增成功');
  //       // 清空輸入欄位
  //       setComment_Content('');
  //       router.push('/forum');
  //     }
  //   } catch (error) {
  //     console.error('發生錯誤:', error);
  //   }
  // };

  const addMessage = (e) => {
    e.preventDefault();
    console.log(sendMessage);
    Swal.fire({
      icon: 'success',
      title: '新增留言成功！',
      showConfirmButton: false,
    });
    fetch(process.env.API_SERVER + '/forum/addmessage', {
      method: 'POST',
      body: JSON.stringify({ ...sendMessage, forum_sid: forum[0].forum_sid }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);

        const resetMessage = sendMessage;
        setSendMessage({ ...resetMessage, content: '' });
        router.push(`/forum/${router.query.rid}`);
      });
  };

  // Swal.fire({
  //   title: '您尚未登入',
  //   text: '需要登入即可按喜歡！',
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonText: '取消',
  //   confirmButtonText: '登入',
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     router.push('/login');
  //   }
  // });

  return (
    <>
      <Head>
        <title>食GOEAT! / 美食論壇</title>
      </Head>
      <div className={styles.container}>
        <Newnav />

        <div className={styles.flex}>
          <div className={styles.avatar}>
            <img
              src={`http://localhost:3002/img/member/${article.user_photo}`}
            />
          </div>
          <div className={styles.nickname}>{article.nickname}</div>
        </div>
        <div className={styles.ptext}></div>
        <DetailTitle data={article.header} />
        <TagTime data={article.publishedTime} />
        <div className={styles.left}>
          {article.forum_photo && (
            <div className={styles.imgcontainer}>
              <img
                src={`${imgPreview + article.forum_photo}`}
                className={styles.img}
              />
            </div>
          )}
          <div className={styles.pcontainer}>
            <DetailP data={article.forum_content} key={article.forum_sid} />
          </div>
        </div>
        {auth.account ? (
          <MessageInput
            handleAddContent={handleAddContent}
            addMessage={addMessage}
            // handlemessagepost={handlemessagepost}
            userPhoto={userPhoto}
            sendMessage={sendMessage}
        
          />
        ) : (
          ''
        )}
        <Message messages={messages} />
      </div>
    </>
  );
}
