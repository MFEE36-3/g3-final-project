import React, { useState } from 'react'
import CategoryDiv from './categorydiv'
import style from '@/styles/reservation/style.module.css'
import Products from './products'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingCart from '../shoppingcart'
import ShoppingBag from '@/public/reservation/shoppingbag.svg'

export default function Togo() {

    const [category, setCategory] = useState('所有餐點')
    const [show, setShow] = useState(false);

    //購物車Offcanvas
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCategory = (category) => {
        setCategory(category)
    }

    return (
        <>
            {/* <div>
                <Image src={ShoppingBag} variant="primary" onClick={handleShow} />

                <Offcanvas show={show} onHide={handleClose} placement={'end'} className={style.cartbody}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className={style.carttitle}>--您的購物車--</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ShoppingCart />
                    </Offcanvas.Body>
                </Offcanvas>
            </div> */}
            <CategoryDiv category={category} handleCategory={handleCategory} />
            <Products category={category} setCategory={setCategory} />
        </>
    )
}
