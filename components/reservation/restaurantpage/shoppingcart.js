import { useState, useEffect } from 'react'
import style from '@/styles/reservation/style.module.css'
import { Button } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";

export default function ShoppingCart({ shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime }) {

    // const [products, setProducts] = useState(Object.values(shoppingCart)); // 使用 Object.values() 取得購物車商品陣列

    const cartitem = localStorage.getItem('order')
    // console.log(cartitem);

    const menuItems = JSON.parse(cartitem) || 0;
    // console.log(menuItems);
    const menuItemsArray = Object.values(menuItems);
    // console.log(menuItemsArray);

    const [products, setProducts] = useState(menuItemsArray)


    //商品數量-增加
    const handleAdd = (item) => {

        //更新LocalStorage
        const oldCart = JSON.parse(localStorage.getItem('order'))
        localStorage.setItem('order', JSON.stringify({
            ...oldCart,
            [item.itemId]: {
                itemId: item.itemId,
                itemName: item.itemName,
                src: item.src,
                price: item.price,
                amount: item.amount + 1,
            }
        }))

        setProducts(prevProuducts => {
            return prevProuducts.map(product => {
                if (product.itemId === item.itemId) {
                    return { ...product, amount: product.amount + 1 }
                }
                return product;
            })
        })

    }
    //商品數量-減少
    const handleSub = (item) => {
        if (item.amount > 1) {
            //更新LocalStorage
            const oldCart = JSON.parse(localStorage.getItem('order'))
            localStorage.setItem('order', JSON.stringify({
                ...oldCart,
                [item.itemId]: {
                    itemId: item.itemId,
                    itemName: item.itemName,
                    src: item.src,
                    price: item.price,
                    amount: item.amount - 1,
                }
            }))
        }

        setProducts(prevProuducts => {
            return prevProuducts.map(product => {
                if (product.itemId === item.itemId && product.amount > 1) {
                    return { ...product, amount: product.amount - 1 }
                }
                return product;
            })
        })

    }
    //商品數量-刪除
    const handleRemove = (item) => {

        //更新LocalStorage
        const oldCart = JSON.parse(localStorage.getItem('order'))
        delete oldCart[item.itemId];
        localStorage.setItem('order', JSON.stringify(oldCart));

        // 检查localStorage是否为空，如果为空，则删除该localStorage项
        if (Object.keys(oldCart).length === 0) {
            localStorage.removeItem('order');
        }

        // // 重新从localStorage中获取数据并更新products数组
        // const updatedCart = JSON.parse(localStorage.getItem('order')) || {};
        // const updatedProducts = Object.values(updatedCart);

        // // 使用setProducts函数更新products数组
        // setProducts(updatedProducts);

        setProducts(prevProducts => {
            return prevProducts.filter(product => product.itemId !== item.itemId);
        });
    }


    return (
        <>

            {products.length > 0 ?
                <div>
                    {
                        products.map((v) => {
                            return (
                                <>
                                    <div key={v.itemId} className={style.shoppingcartdiv}>

                                        <div>
                                            <img src={v.src} className={style.cartimage}></img>
                                        </div>
                                        <div className={style.shoppingcartbody1}>
                                            <div className={style.shoppingcartbody2}>
                                                <div>{v.itemName}</div>
                                                <div><BsTrash className={style.trashicon} onClick={() => { handleRemove(v) }} /></div>
                                            </div>

                                            <div className={style.shoppingcartbody2}>
                                                <div className={style.shoppingcartbody3}>

                                                    <button
                                                        className={style.cartbutton}
                                                        onClick={() => {
                                                            handleSub(v)
                                                        }}
                                                    >
                                                        –
                                                    </button>

                                                    <div className={style.cartcount}>{v.amount}</div>

                                                    <button
                                                        className={style.cartbutton}
                                                        onClick={() => {
                                                            // setProducts(add(products, v.id))
                                                            handleAdd(v)
                                                        }}
                                                    >
                                                        +
                                                    </button>

                                                </div>
                                                <div className={style.cartprice}>
                                                    ${v.price}
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
                    } </div>
                :
                <div className={style.cartemptydiv}>
                    <GiShoppingCart className={style.cartemptyicon} />
                    <div className={style.cartemptytext}>購物車中沒有商品</div>
                </div>
            }

            {products.length > 0 && togodate ?
                <div>{togodate}</div> : ''
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
