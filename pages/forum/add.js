import React from 'react';
import styles from './add.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Newnav from '@/components/common/news/new_nav';
import { useState } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';

export default function Add() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [showImg, setShowImg] = useState('');
  const imgUpload = async (e) => {
    const file = e.target.files[0];
    // const fileField = document.querySelector('input[type="file"]');
    setImg(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append('preImg', file);
    formData.append('user_id', auth.sid); // 添加 user_id
    formData.append('header', header); // 添加文章標題
    formData.append('content', content); // 添加內容

    try {
      const response = await fetch(process.env.API_SERVER + '/forum/add', {
        method: 'POST',
        body: formData,
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          if (data.filename) {
            setShowImg(data.filename);
          }
        });
      const result = await response.json();
      console.log('Success', result);
    } catch (error) {
      console.error('Error', error);
    }
  };
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

    // 判断用户是否上傳了圖片
    const photo = showImg ? showImg : '';

    const postData = {
      header: header,
      content: content,
      photo: photo,
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
        console.log('文章新增成功');
        // 清空輸入欄位
        setHeader('');
        setContent('');
        router.push('/forum');
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
        {/* <div className={styles.between}> */}

        <div className={styles.end}></div>
      </div>
      {/* </div> */}
      {/* 新增和取消按钮的区块 */}

      <div className={styles.buttonContainer}>
        <div>
          <input
            type="file"
            name="preImg"
            accept="image/jpeg, image/webp"
            onChange={imgUpload}
          />
        </div>
        <div>
        <button className={styles.cancel}>取消</button>
        <button
          className={styles.addbtn}
          onClick={handleAddPost}
          roles="presentation"
        >
          發布貼文
        </button>
        </div>
      </div>
    </>
  );
}
