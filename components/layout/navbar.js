import React from "react";
import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaShoppingCart } from 'react-icons/fa';
import styles from '@/styles/navbar.module.css'

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

            <img src="img_for_icon/chocoCookie.svg" className={styles.choco}></img>
            <div className={styles.big_title_container}>
                <img src="img_for_icon/bigtitle.svg" className={styles.big_title}></img>
            </div>
            <Link href="#"><img src="img_for_icon/littletitle.svg" className={styles.little_title}></img></Link>
            <Link href="#"><FaShoppingCart className={styles.cart} /></Link>


            <Link href="#"><div className={styles.member_icon}></div></Link>
            <img src="img_for_icon/hand.svg" className={styles.hand_left}></img>
            <img src="img_for_icon/hand.svg" className={styles.hand_right}></img>

            {/* 下面做sticky-navbar */}


            <nav className={styles.nav}>
                <img src="img_for_icon/navbar_back.svg" className={styles.nav_back}></img>
                <div className={styles.btn_left_container}>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'buyforme') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <img src="img_for_icon/hamburger.svg" className={styles.hamburger}></img>
                            <p className={styles.btn_text}>順路買買</p>
                        </button>
                    </Link>
                </div>
                <div className={styles.btn_right_container}>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'reservation-togo') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <img src="img_for_icon/candychief_btn.svg" className={styles.candy}></img>
                            <p className={styles.btn_text}>訂位/外帶</p>
                        </button>
                    </Link>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'shopping-mall') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <img src="img_for_icon/chip.svg" className={styles.chips}></img>
                            <p className={styles.btn_text}>美食商城</p>
                        </button>
                    </Link>
                    <Link href="#" className={styles.btn_outer_link}>
                        <button className={(router_title === 'forum') ? `${styles.navbtn_active} btn` : `${styles.navbtn} btn`}>
                            <img src="img_for_icon/bubble_tea.svg" className={styles.bubble_tea}></img>
                            <p className={styles.btn_text}>美食論壇</p>
                        </button>
                    </Link>
                </div>
            </nav>



        </header>)
}
