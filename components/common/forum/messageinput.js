import React, { useState, useContext, useEffect } from 'react';
import styles from './messageinput.module.css';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
export default function MessageInput({
  sendMessage,
  userPhoto,
  handlemessagepost,
  addMessage,
  handleAddContent,
  showLoginAlert,
  forumSid,
}) {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const handleAddMessage = () => {
    if (auth.account) {
      addMessage();
    } else {
      showLoginAlert(router);
    }
  };

  return (
    <>
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
    </>
  );
}
