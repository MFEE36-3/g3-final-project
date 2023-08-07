import React, { useState, useContext, useEffect } from 'react';
import styles from './messageinput.module.css';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
export default function MessageInput({ messages }) {
  console.log(messages);
  const [message, setMessage] = useState('');

  const { auth } = useContext(AuthContext);
  const router = useRouter();
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

  // console.log(sendMessage)
  // console.log(messages)

  // 將留言內容加到要傳送到後端的物件狀態
  const handleAddContent = (e) => {
    setSendMessage({ ...sendMessage, [e.target.name]: e.target.value });
  };

  // 留言新增函式
  // const handlecontent = (e) => {
  //   console.log('content');
  //   setComment_Content(e.target.value);
  // };
  const handlemessagepost = async (e) => {
    console.log('yes');
    e.preventDefault();
    const postData = {
      comment_content: comment_content,
      user_id: null,
    };
    try {
      const response = await fetch('http://localhost:3002/forum/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (data.success) {
        // 文章新增成功，你可以在這裡做任何你想要的處理
        console.log('留言新增成功');
        // 清空輸入欄位
        setComment_Content('');
        router.push('/forum');
      } else {
        // 文章新增失敗，你可以在這裡做任何你想要的處理
        console.error('留言新增失敗');
      }
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  };

  const addMessage = (e) => {
    e.preventDefault();

    fetch(process.env.API_SERVER + '/forum/addmessage', {
      method: 'POST',
      body: JSON.stringify(sendMessage),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        // 記得把這個打開
        // router.push(`/forum/${rid}`)
      });
  };

  return (
    <>
      {/* <form onSubmit={()=>{}} className={styles.form}> */}
      <div className={styles.inputContainer}>
        {/* {messages.map((msg, index) => (
            <div key={index} className={styles.avatar}>
              <img src={`http://localhost:3002/img/member/${msg.photo}`} />
            </div>
          ))} */}

        <div className={styles.avatar}>
          <img
            src={`http://localhost:3002/img/member/${userPhoto.user_photo}`}
          />
        </div>

        <input
          className={styles.input}
          type="text"
          name="content"
          value={sendMessage.content}
          onChange={handleAddContent}
          placeholder="輸入訊息..."
        />
        <button type="submit" className={styles.iconButton}>
          <RiSendPlane2Fill className={styles.icon} onClick={addMessage} />
        </button>
      </div>
      {/* </form> */}
    </>
  );
}
