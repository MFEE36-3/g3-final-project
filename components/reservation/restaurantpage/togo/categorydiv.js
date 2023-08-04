import { useState } from 'react'
import { GiCakeSlice, GiHotMeal, GiFruitBowl, GiKnifeFork } from "react-icons/gi";
import { FaMartiniGlassCitrus } from "react-icons/fa6";
import { LuSoup } from "react-icons/lu";
import style from '@/styles/reservation/style.module.css'

export default function CategoryDiv({ category, handleCategory }) {

    return (
        <div className={style.categorynav}>
            <div className={category === 100 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(100)
                }}>
                <GiKnifeFork />
                <div className={style.categoryfont}>所有餐點</div>
            </div>

            <div className={category === 1 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(1)
                }}>
                <GiFruitBowl />
                <div className={style.categoryfont}>開胃菜</div>
            </div>

            <div className={category === 2 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(2)
                }}>
                <GiHotMeal />
                <div className={style.categoryfont}>主餐</div>
            </div>

            <div className={category === 3 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(3)
                }}>
                <LuSoup />
                <div className={style.categoryfont}>湯品</div>
            </div>

            <div className={category === 4 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(4)
                }}>
                <GiCakeSlice />
                <div className={style.categoryfont}>甜點</div>
            </div>

            <div className={category === 5 ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handleCategory(5)
                }}>
                <FaMartiniGlassCitrus />
                <div className={style.categoryfont}>飲料</div>
            </div>

        </div>
    )
}
