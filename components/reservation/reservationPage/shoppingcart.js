import { useState } from 'react'
import style from '@/styles/reservation/style.module.css'
import Image from 'next/image'
import Trash from '@/public/reservation/trash.svg'

export default function ShoppingCart() {

    const shoppingfood = [
        { id: 1, name: "泰式打拋豬", price: 290, count: 5 },
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
                        <div key={id} className={style.shoppingcartdiv}>

                            <div>
                                <img src="../../reservation/foodpic.png" className={style.cartimage}></img>
                            </div>
                            <div className={style.shoppingcartbody1}>
                                <div className={style.shoppingcartbody2}>
                                    <div>{name}</div>
                                    <div><Image src={Trash} style={{ width: "30px", height: "30px" }} /></div>
                                </div>

                                <div className={style.shoppingcartbody2}>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setProducts(add(products, v.id))
                                            }}
                                        >
                                            +
                                        </button>
                                        (<b>{v.count}</b>)
                                        <button
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
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
