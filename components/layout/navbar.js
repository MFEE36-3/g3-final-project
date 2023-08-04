import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '@/styles/navbar.module.css';
import chocoCookie from '@/public/img_for_icon/chocoCookie.svg';
import bigtitle from '@/public/img_for_icon/bigtitle.svg';
import littletitle from '@/public/img_for_icon/littletitle.svg';
import hand from '@/public/img_for_icon/hand.svg';
import navbar_back from '@/public/img_for_icon/navbar_back.svg';
import hamburger from '@/public/img_for_icon/hamburger.svg';
import candychief from '@/public/img_for_icon/candychief_btn.svg';
import chip from '@/public/img_for_icon/chip.svg';
import bubble_tea from '@/public/img_for_icon/bubble_tea.svg';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Btn from '../common/btn';

export default function Navbar() {
  // function active_btn (e){
  //     e.target.classList.add("navbtn_active");
  //     e.target.classList.remove("navbtn");
  //     console.log(e.target.classList);
  // }

  const router = useRouter();

  const [router_title, setRouter_title] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [first, setFirst] = useState(false);

  const { auth, logout } = useContext(AuthContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const islogout = () => {
    logout();
    setIsLogin(false);
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  useEffect(() => {
    setRouter_title(router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('auth')) setIsLogin(true);
  }, [auth, first]);

  //下面寫if判斷路由關鍵字 如果有符合就把router_title設成那個

  return (
    <>
      <Image
        src={chocoCookie}
        className={styles.choco}
        alt="chocoCookie"
        priority
      ></Image>
      <div className={styles.big_title_container}>
        <Image
          src={bigtitle}
          className={styles.big_title}
          alt="bigtitle"
          priority
        ></Image>
      </div>
      <Link href="/">
        <Image
          src={littletitle}
          className={styles.little_title}
          style={{ width: 'auto' }}
          alt="littletitle"
          priority
        ></Image>
      </Link>
      <Link href={
        router_title.includes('/shopmall')
        ?"/checkout?page=shop":router_title.includes('/reservation')
        ?"/checkout?page=order":router_title.includes('/member')
        ?"/checkout?page=subscribe":"/checkout"
        }>
        <FaShoppingCart className={styles.cart} />
      </Link>

      {auth ? (
        <button className={styles.member_icon} onClick={handleToggle}>
          {isOpen && (
            <div className={styles.iconArea}>
              {!isLogin ? (
                <Link href="/member/form">
                  <Btn text={'註冊'} padding={'2px 5px'} />
                </Link>
              ) : (
                <Link href="/member">
                  <Btn text={'會員中心'} padding={'2px 5px'} />
                </Link>
              )}
              {!isLogin ? (
                <Link href="/login">
                  <Btn text={'登入'} padding={'2px 5px'} />
                </Link>
              ) : (
                <div>
                  <Btn text={'登出'} padding={'2px 5px'} onClick={islogout} />
                </div>
              )}
            </div>
          )}
        </button>
      ) : (
        <button className={styles.member_icon} onClick={handleToggle}>
          {isOpen && (
            <div className={styles.iconArea}>
              <Link href="/member/login">
                <Btn text={'會員登入'} padding={'2px 5px'} />
              </Link>
              <Link href="/member/form">
                <Btn text={'註冊會員'} padding={'2px 5px'} />
              </Link>
            </div>
          )}
        </button>
      )}

      <Image
        src={hand}
        className={styles.hand_left}
        alt="hand"
        priority
      ></Image>
      <Image
        src={hand}
        className={styles.hand_right}
        alt="hand"
        priority
      ></Image>

      {/* 下面做sticky-navbar */}

      <nav className={styles.nav}>
        <Image
          src={navbar_back}
          className={styles.nav_back}
          alt="navbar_back"
          priority
        ></Image>
        <div className={styles.btn_right_container}>
          <Link
            href="/buyforme"
            className={`${styles.btn_outer_link} ${styles.btn_hamburger}`}
          >
            <button
              className={
                router_title.includes('/buyforme')
                  ? `${styles.navbtn_active} btn`
                  : `${styles.navbtn} btn`
              }
            >
              <Image
                src={hamburger}
                className={styles.hamburger}
                alt="hamburger"
                priority
              ></Image>
              <p className={styles.btn_text}>順路買買</p>
            </button>
          </Link>
          <Link href="/reservation" className={styles.btn_outer_link}>
            <button
              className={
                router_title.includes('/reservation')
                  ? `${styles.navbtn_active} btn`
                  : `${styles.navbtn} btn`
              }
            >
              <Image
                src={candychief}
                className={styles.candy}
                alt="candychief"
                priority
              ></Image>
              <p className={styles.btn_text}>訂位/外帶</p>
            </button>
          </Link>
          <Link href="/shopmall" className={styles.btn_outer_link}>
            <button
              className={
                router_title.includes('/shopmall')
                  ? `${styles.navbtn_active} btn`
                  : `${styles.navbtn} btn`
              }
            >
              <Image
                src={chip}
                className={styles.chips}
                alt="chip"
                priority
              ></Image>
              <p className={styles.btn_text}>美食商城</p>
            </button>
          </Link>
          <Link href="/forum" className={styles.btn_outer_link}>
            <button
              className={
                router_title.includes('/forum') ||
                router_title.includes('/news')
                  ? `${styles.navbtn_active} btn`
                  : `${styles.navbtn} btn`
              }
            >
              <Image
                src={bubble_tea}
                className={styles.bubble_tea}
                alt="bubble_tea"
                priority
              ></Image>
              <p className={styles.btn_text}>美食論壇</p>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
