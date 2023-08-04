import React, { useState } from 'react';
import styles from './messageinput.module.css';
import { RiSendPlane2Fill } from 'react-icons/ri';

export default function MessageInput({ messages }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('送出訊息:', message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
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
            <RiSendPlane2Fill className={styles.icon} />
          </button>
        </div>
      </form>
    </>
  );
}
