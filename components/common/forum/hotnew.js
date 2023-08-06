// import React from 'react';
import styles from './hotnew.module.css';
import { BsPencilSquare } from 'react-icons/bs';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

export default function Hotnew() {
  const { auth, setAuth, logout } = useContext(AuthContext)
  const router = useRouter()

  const [catchSid, setCatchSid] = useState('')
  useEffect(()=>{
    if(auth.account){
      setCatchSid(auth.account)
    }
  },[auth])

  const checkLogin = (e)=>{
    if(auth.account){
      console.log('有帳號')
      router.push('/forum/add')
    }else{
      console.log('沒有帳號')
      Swal.fire({
        title: '您尚未登入',
        text: "登入即可新增文章",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '登入',
        cancelButtonText:'取消登入'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login')
        }else{

        }
      })
    }
  }

  return (
    <>
      <div className={styles.bigcontainer}>
        <div className={styles.container1}>
          <div className={styles.ptext}>熱門</div>
          <div className={styles.ptext}>最新</div>
        </div>
        <div className={styles.container2}>
          {/* <Link href="/forum/add" onClick={checkLogin}> */}
            {' '}
            {/* 使用 Link 組件包裹要連結的元素 */}
            <div className={styles.ptext}>
              <BsPencilSquare onClick={checkLogin}/>
            </div>
          {/* </Link> */}
          <Link href="/member/collect">
          <div className={styles.ptext}>我的貼文</div>
          </Link>
        </div>
      </div>
    </>
  );
}
