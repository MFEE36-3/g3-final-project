import React, { useState } from 'react';
import styles from './messageinput.module.css';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
export default function MessageInput({ messages }) {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [comment_content, setComment_Content] = useState('');

  // 留言新增函式
  const handlecontent = (e) => {
    console.log('content');
    setComment_Content(e.target.value);
  };
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

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.avatar}>
              <img src={`http://localhost:3002/img/member/${msg.photo}`} />
            </div>
          ))}

          <input
            className={styles.input}
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="輸入訊息..."
          />
          <button type="submit" className={styles.iconButton}>
            <RiSendPlane2Fill className={styles.icon} onClick={handlemessagepost}/>
          </button>
        </div>
      </form>
    </>
  );
}
