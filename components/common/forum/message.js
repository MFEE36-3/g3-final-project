import React from 'react';
import dayjs from 'dayjs'; // 載入 dayjs 或其他日期時間處理庫
import styles from './message.module.css';

export default function Message({ messages }) {
 
  return (
    <>
      {messages.map((message) => (
        <div key={message.message_sid} className={styles.flex}>
          <div>
            <div className={styles.avatar}>
              <img src={`http://localhost:3002/img/member/${message.photo}`} />
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.nickname}>{message.nickname}</div>
            <div className={styles.message}>{message.comment_content}</div>
            <div className={styles.time}>
              {dayjs(message.publishedTime).format('YYYY年MM月DD日')}
              {/* 使用 dayjs 或其他日期時間處理庫來轉換日期時間格式 */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
