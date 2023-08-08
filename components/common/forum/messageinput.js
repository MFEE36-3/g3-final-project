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

  const [userPhoto, setUserPhoto] = useState({
    user_id: '',
    user_photo: '',
  });

  const [sendMessage, setSendMessage] = useState({
    member_id: '',
    content: '',
    forum_sid: '',
  });

  useEffect(() => {
    if (messages.length && messages[0].forum_sid) {
      setSendMessage((prevSendMessage) => ({
        ...prevSendMessage,
        forum_sid: messages[0].forum_sid,
      }));
    }
  }, [messages]);

  useEffect(() => {
    if (auth.account) {
      setSendMessage((prevSendMessage) => ({
        ...prevSendMessage,
        member_id: auth.sid,
      }));

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

  const handleAddContent = (e) => {
    setSendMessage((prevSendMessage) => ({
      ...prevSendMessage,
      [e.target.name]: e.target.value,
    }));
  };

  const handlemessagepost = async (e) => {
    // ...
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

  useEffect(() => {
    // 从本地存储恢复数据
    const storedContent = localStorage.getItem('sendMessageContent');
    if (storedContent) {
      setSendMessage((prevSendMessage) => ({
        ...prevSendMessage,
        content: storedContent,
      }));
    }
  }, []); // 只在组件加载时运行一次

  useEffect(() => {
    // 将数据保存到本地存储
    localStorage.setItem('sendMessageContent', sendMessage.content);
  }, [sendMessage.content]); // 在 sendMessage.content 更改时运行

  return (
    <>
      {auth.account && (
        <div className={styles.inputContainer}>
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
      )}
    </>
  );
}
