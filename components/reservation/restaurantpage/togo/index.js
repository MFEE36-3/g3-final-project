import React, { useState } from 'react'
import CategoryDiv from './categorydiv'
import style from '@/styles/reservation/style.module.css'
import Products from './products'
// import Offcanvas from 'react-bootstrap/Offcanvas';
import TogoDateTime from './togodatetime';
// import ShoppingCart from '../shoppingcart'
// import ShoppingBag from '@/public/reservation/shoppingbag.svg'
// import Image from 'next/image';

export default function Togo({ row, shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime, item, setItem }) {

    const [category, setCategory] = useState(100)

    const handleCategory = (category) => {
        setCategory(category)
    }

    return (
        <>
            <div className={style.togoindex}>
                <TogoDateTime row={row} togodate={togodate} setTogodate={setTogodate} togotime={togotime} setTogotime={setTogotime} />
            </div>
            <CategoryDiv category={category} handleCategory={handleCategory} />
            <Products category={category} setCategory={setCategory} row={row} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} togodate={togodate} setTogodate={setTogodate}
                togotime={togotime} setTogotime={setTogotime} item={item} setItem={setItem} />
        </>
    )
}
