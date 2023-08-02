import { useState } from 'react'
import style from '@/styles/reservation/style.module.css'
import { Button } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";

export default function ShoppingCart({ shoppingCart, setShoppingCart }) {

    const [products, setProducts] = useState(Object.values(shoppingCart)); // 使用 Object.values() 取得購物車商品陣列

    // const [products, setProducts] = useState(shoppingfood)

    // const add = (products, id) => {
    //     return products.map((v) => {
    //         if (v.id === id) return { ...v, count: v.count + 1 }
    //         return { ...v }
    //     })
    // }

    // const sub = (products, id) => {
    //     return products.map((v) => {
    //         if (v.id === id) return { ...v, count: v.count - 1 }
    //         return { ...v }
    //     })
    // }

    // const remove = (products, id) => {
    //     return products.filter((v) => v.id !== id)
    // }

    //商品數量-增加
    const handleAdd = (id) => {
        setProducts(prevProuducts => {
            return prevProuducts.map(product => {
                if (product.food_id === id) {
                    return { ...product, amount: product.amount + 1 }
                }
                return product;
            })
        })
    }
    //商品數量-減少
    const handleSub = (id) => {
        setProducts(prevProuducts => {
            return prevProuducts.map(product => {
                if (product.food_id === id && product.amount > 1) {
                    return { ...product, amount: product.amount - 1 }
                }
                return product;
            })
        })
    }


    return (
        <>
            {
                products.map((v) => {
                    return (
                        <>
                            <div key={v.food_id} className={style.shoppingcartdiv}>

                                <div>
                                    <img src={`${process.env.API_SERVER}/img/res-img/${v.food_img}`} className={style.cartimage}></img>
                                </div>
                                <div className={style.shoppingcartbody1}>
                                    <div className={style.shoppingcartbody2}>
                                        <div>{v.food_title}</div>
                                        <div><BsTrash className={style.trashicon} /></div>
                                    </div>

                                    <div className={style.shoppingcartbody2}>
                                        <div className={style.shoppingcartbody3}>

                                            <button
                                                className={style.cartbutton}
                                                onClick={() => {
                                                    // 預期: 目前商品數量是1，再按-按鈕，數量會變0 -> 就作移除
                                                    // console.log(v.count)
                                                    // if (v.count === 1) {
                                                    //     // 作刪除
                                                    //     setProducts(remove(products, v.id))
                                                    // } else {
                                                    //     // 作減數量
                                                    //     setProducts(sub(products, v.id))
                                                    // }
                                                    handleSub(v.food_id)
                                                }}
                                            >
                                                –
                                            </button>

                                            <div className={style.cartcount}>{v.amount}</div>

                                            <button
                                                className={style.cartbutton}
                                                onClick={() => {
                                                    // setProducts(add(products, v.id))
                                                    handleAdd(v.food_id)
                                                }}
                                            >
                                                +
                                            </button>

                                        </div>
                                        <div className={style.cartprice}>
                                            ${v.food_price}
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <hr className={style.hrcolor} />
                        </>
                    )
                })
            }
            <div>
                <Button className={style.cartsendbutton}
                >
                    送出結帳
                </Button>
            </div>

        </>
    )
}
