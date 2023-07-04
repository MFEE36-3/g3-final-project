import React from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/footer.module.css';
import Image from "next/image";
import happy_foods from '@/public/img_for_icon/happy_foods.svg';
import happy_foods_left from '@/public/img_for_icon/happy_foods_left.svg';
import happy_foods_right from '@/public/img_for_icon/happy_foods_right.svg';
import belt from '@/public/img_for_icon/belt.svg';
import shield from '@/public/img_for_icon/shield.svg';
import gear from '@/public/img_for_icon/gear_left_1.svg';


export default function Footer() {


    return (
        <footer>
            <div className={styles.outer}>
                <div className={styles.happy_foods}>
                    <Image src={happy_foods} className={styles.happy_foods_hide}></Image>
                    <Image src={happy_foods_left} className={styles.happy_foods_left}></Image>
                    <Image src={happy_foods_right} className={styles.happy_foods_right}></Image>
                </div>
                <div className={styles.belt}>
                    <Image src={belt} className={`${styles.belt_running}  ${styles.belt_middle}`} style={{ width: '100%', height: 'auto' }}></Image>
                    <Image src={belt} className={`${styles.belt_running} ${styles.belt_left}`} style={{ width: '100%', height: 'auto' }}></Image>
                    <Image src={belt} className={`${styles.belt_running} ${styles.belt_right}`} style={{ width: '100%', height: 'auto' }}></Image>
                    <Image src={shield} className={styles.shield} style={{ width: '100%', height: 'auto' }}></Image>
                </div>
                <div className={styles.gear_group}>
                    <Image src={gear} className={`${styles.gear_rolling} ${styles.gear}`}></Image>
                    <Image src={gear} className={`${styles.gear_rolling} ${styles.gear}`}></Image>
                </div>

                <p className={styles.copy_right}>Copyright © 2023 MFEE36 TEAM3. All rights reserved.</p>
            </div>
        </footer>
    )
}