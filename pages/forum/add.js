import React from 'react';
import styles from './add.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Newnav from '@/components/common/news/new_nav';
import { useState } from 'react';

export default function Add() {
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  // 文章新增函式
  const handleheader = (e) => {
    console.log('header');
    setHeader(e.target.value);
  };
  const handlecontent = (e) => {
    console.log('content');
    setContent(e.target.value);
  };
  const handleAddPost = async (e) => {
    console.log('yes');
    e.preventDefault();
    const postData = {
      header: header,
      content: content,
      photo: '',
      user_id: '',
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
        console.log('文章新增成功');
        // 清空輸入欄位
        setHeader('');
        setContent('');
      } else {
        // 文章新增失敗，你可以在這裡做任何你想要的處理
        console.error('文章新增失敗');
      }
    } catch (error) {
      console.error('發生錯誤:', error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Newnav />
        <h3 className={styles.text}>新增貼文</h3>
        <div className={styles.line}></div>
        {/* <Button
          className={styles.btn}
          sx={{ '&& .MuiTouchRipple-child': { backgroundColor: '#911010' } }}
        >
          <div className={styles.btn_text}>點擊選擇看板</div>
        </Button> */}
        <div>
          <input
            type="text"
            placeholder="請輸入標題"
            value={header}
            className={styles.input1}
            onChange={handleheader}
          ></input>
        </div>
        <textarea
          type="text"
          placeholder="敘述"
          value={content}
          className={styles.input2}
          onChange={handlecontent}
        ></textarea>
        <div className={styles.between}>
          <FontAwesomeIcon icon={faImage} className={styles.icon} />
          <div className={styles.end}>
            <button className={styles.cancel}>取消</button>
            <button
              className={styles.addbtn}
              onClick={handleAddPost}
              roles="presentation"
            >
              新增
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
