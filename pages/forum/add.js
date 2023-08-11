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
import Swal from 'sweetalert2';
import { FaPhotoVideo } from 'react-icons/fa';
import Head from 'next/head';
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
  const originErrors = { header: '', content: '' };
  const [errors, setErrors] = useState(originErrors);
  const handleblur = (e) => {
    const newError = { ...originErrors };
    if (!header) {
      newError.header = '* 請輸入標題';
    }
    if (!content) {
      newError.content = '* 請輸入敘述';
    }
    setErrors(newError);
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
    Swal.fire({
      icon: 'success',
      title: '新增文章成功！',
    });
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
      <Head>
        <title>食GOEAT! / 美食論壇</title>
      </Head>
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
        <div className={styles.errorcontainer}>
          <input
            type="text"
            placeholder="請輸入標題"
            value={header}
            className={styles.input1}
            onChange={handleheader}
            onBlur={handleblur}
          ></input>
          <div className={styles.errorheader}>{errors.header}</div>
        </div>
        
        <div></div>
        <div>
          <textarea
            type="text"
            placeholder="敘述"
            value={content}
            className={styles.input2}
            onChange={handlecontent}
            onBlur={handleblur}
          ></textarea>
        </div>
        <div className={styles.errorheader}>{errors.content}</div>
        <div className={styles.end}></div>
      </div>

      <div className={styles.buttonContainer}>
        {/* <FaPhotoVideo className={styles.icon} onChange={imgUpload} /> */}
        {/* <input
            className={styles.fileinput}
            type="file"
            name="preImg"
            accept="image/jpeg, image/webp"
            // onChange={imgUpload}
          /> */}
        <div>
          {' '}
          <label htmlFor="file-upload" className="custom-file-upload">
            <FaPhotoVideo className={styles.icon} /> 請選擇照片
          </label>
          <input id="file-upload" type="file" onChange={imgUpload} />
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
