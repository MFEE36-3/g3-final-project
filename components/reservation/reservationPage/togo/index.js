import React, { useState } from 'react'
import CategoryDiv from './categorydiv'
import style from '@/styles/reservation/style.module.css'
import Products from './products'

export default function Togo() {

    const [category, setCategory] = useState('所有餐點')

    const handleCategory = (category) => {
        setCategory(category)
    }

    return (
        <>
            <CategoryDiv category={category} handleCategory={handleCategory} />
            <Products category={category} setCategory={setCategory} />
        </>
    )
}
