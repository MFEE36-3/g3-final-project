import { useState } from 'react'
import { GiCakeSlice, GiHotMeal, GiFruitBowl, GiKnifeFork } from "react-icons/gi";
import { FaMartiniGlassCitrus } from "react-icons/fa6";
import { LuSoup } from "react-icons/lu";
import style from '@/styles/reservation/style.module.css'

export default function CatergoryDiv() {

    const [category, setCategory] = useState('所有餐點')

    const handlesetCategory = (category) => {
        setCategory(category)
    }

    return (
        <div className={style.categorynav}>
            <div className={category === '所有餐點' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('所有餐點')
                }}>
                <GiKnifeFork />
                <div className={style.categoryfont}>所有餐點</div>
            </div>

            <div className={category === '開胃菜' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('開胃菜')
                }}>
                <GiFruitBowl />
                <div className={style.categoryfont}>開胃菜</div>
            </div>

            <div className={category === '主餐' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('主餐')
                }}>
                <GiHotMeal />
                <div className={style.categoryfont}>主餐</div>
            </div>

            <div className={category === '湯品' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('湯品')
                }}>
                <LuSoup />
                <div className={style.categoryfont}>湯品</div>
            </div>

            <div className={category === '甜點' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('甜點')
                }}>
                <GiCakeSlice />
                <div className={style.categoryfont}>甜點</div>
            </div>

            <div className={category === '飲品' ? style.categorydivactive : style.categorydiv}
                onClick={() => {
                    handlesetCategory('飲品')
                }}>
                <FaMartiniGlassCitrus />
                <div className={style.categoryfont}>飲品</div>
            </div>

        </div>
    )
}
