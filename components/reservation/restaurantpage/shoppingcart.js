import { useState } from 'react'
import style from '@/styles/reservation/style.module.css'
import { Button } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";

export default function ShoppingCart() {

    const shoppingfood = [
        { id: 1, name: "泰式打拋豬肉", price: 290, count: 5 },
        { id: 2, name: "月亮蝦餅", price: 220, count: 2 }
    ]
    const [products, setProducts] = useState(shoppingfood)

    const add = (products, id) => {
        return products.map((v) => {
            if (v.id === id) return { ...v, count: v.count + 1 }
            return { ...v }
        })
    }

    const sub = (products, id) => {
        return products.map((v) => {
            if (v.id === id) return { ...v, count: v.count - 1 }
            return { ...v }
        })
    }

    const remove = (products, id) => {
        return products.filter((v) => v.id !== id)
    }


    return (
        <>
            {
                products.map((v) => {
                    const { id, name, price } = v;
                    return (
                        <>
                            <div key={id} className={style.shoppingcartdiv}>

                                <div>
                                    <img src="../../reservation/foodpic.png" className={style.cartimage}></img>
                                </div>
                                <div className={style.shoppingcartbody1}>
                                    <div className={style.shoppingcartbody2}>
                                        <div>{name}</div>
                                        <div><BsTrash className={style.trashicon} /></div>
                                    </div>

                                    <div className={style.shoppingcartbody2}>
                                        <div className={style.shoppingcartbody3}>
                                            <button
                                                className={style.cartbutton}
                                                onClick={() => {
                                                    setProducts(add(products, v.id))
                                                }}
                                            >
                                                +
                                            </button>
                                            <div className={style.cartcount}>{v.count}</div>
                                            <button
                                                className={style.cartbutton}
                                                onClick={() => {
                                                    // 預期: 目前商品數量是1，再按-按鈕，數量會變0 -> 就作移除
                                                    console.log(v.count)
                                                    if (v.count === 1) {
                                                        // 作刪除
                                                        setProducts(remove(products, v.id))
                                                    } else {
                                                        // 作減數量
                                                        setProducts(sub(products, v.id))
                                                    }
                                                }}
                                            >
                                                –
                                            </button>
                                        </div>
                                        <div className={style.cartprice}>
                                            ${price}
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
                    加入購物車
                </Button>
            </div>

        </>
    )
}
