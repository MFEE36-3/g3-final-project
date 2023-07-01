import React from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import styles from '@/styles/footer.module.css'


export default function Footer() {


    return (
        <footer>
            <div className={styles.outer}>
                <div className={styles.happy_foods}>
                    <img src="img_for_icon/happy_foods.svg" className={styles.happy_foods_hide}></img>
                    <img src="img_for_icon/happy_foods_left.svg" className={styles.happy_foods_left}></img>
                    <img src="img_for_icon/happy_foods_right.svg" className={styles.happy_foods_right}></img>
                </div>
                <div className={styles.belt}>
                    <img src="img_for_icon/belt.svg" className={`${styles.belt_running}  ${styles.belt_middle}`}></img>
                    <img src="img_for_icon/belt.svg" className={`${styles.belt_running} ${styles.belt_left}`}></img>
                    <img src="img_for_icon/belt.svg" className={`${styles.belt_running} ${styles.belt_right}`}></img>
                    <img src="img_for_icon/shield.svg" className={styles.shield}></img>
                </div>
                <div className={styles.gear_group}>
                    <img className={`${styles.gear_rolling} ${styles.gear}`} src="img_for_icon/gear_left_1.svg"></img>
                    <img className={`${styles.gear_rolling} ${styles.gear}`} src="img_for_icon/gear_left_1.svg"></img>
                </div>

                <p className={styles.copy_right}>Copyright © 2023 MFEE36 TEAM3. All rights reserved.</p>
            </div>
        </footer>
    )
}