import React from "react";
import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '@/styles/navbar.module.css'
import chocoCookie from '@/public/img_for_icon/chocoCookie.svg';
import bigtitle from '@/public/img_for_icon/bigtitle.svg';
import littletitle from '@/public/img_for_icon/littletitle.svg';
import hand from '@/public/img_for_icon/hand.svg';
import navbar_back from '@/public/img_for_icon/navbar_back.svg';
import hamburger from '@/public/img_for_icon/hamburger.svg';
import candychief from '@/public/img_for_icon/candychief_btn.svg';
import chip from '@/public/img_for_icon/chip.svg';
import bubble_tea from '@/public/img_for_icon/bubble_tea.svg';

export default function Navbar() {

    // function active_btn (e){
    //     e.target.classList.add("navbtn_active");
    //     e.target.classList.remove("navbtn");
    //     console.log(e.target.classList);
    // }

    const router_title = '';

    //下面寫if判斷路由關鍵字 如果有符合就把router_title設成那個



    return (
        <header>

            <Image src={chocoCookie} className={styles.choco}></Image>
            <div className={styles.big_title_container}>
                <Image src={bigtitle} className={styles.big_title}></Image>
            </div>
            <Link href="#"><Image src={littletitle} className={styles.little_title}></Image></Link>
            <Link href="#"><FaShoppingCart className={styles.cart} /></Link>


            <Link href="#"><div className={styles.member_icon}></div></Link>
            <Image src={hand} className={styles.hand_left}></Image>
            <Image src={hand} className={styles.hand_right}></Image>

            {/* 下面做sticky-navbar */}


            <nav className={styles.nav}>
                <Image src={navbar_back} className={styles.nav_back}></Image>
                <div className={styles.btn_left_container}>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'buyforme') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <Image src={hamburger} className={styles.hamburger}></Image>
                            <p className={styles.btn_text}>順路買買</p>
                        </button>
                    </Link>
                </div>
                <div className={styles.btn_right_container}>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'reservation-togo') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <Image src={candychief} className={styles.candy}></Image>
                            <p className={styles.btn_text}>訂位/外帶</p>
                        </button>
                    </Link>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'shopping-mall') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <Image src={chip} className={styles.chips}></Image>
                            <p className={styles.btn_text}>美食商城</p>
                        </button>
                    </Link>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'forum') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <Image src={bubble_tea} className={styles.bubble_tea}></Image>
                            <p className={styles.btn_text}>美食論壇</p>
                        </button>
                    </Link>
                </div>
            </nav>



        </header>)
}
