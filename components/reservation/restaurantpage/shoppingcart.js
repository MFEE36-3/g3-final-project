import { useState, useEffect } from 'react'
import style from '@/styles/reservation/style.module.css'
import { Button } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { useRouter } from 'next/router';

export default function ShoppingCart({ shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime }) {

    // const [products, setProducts] = useState(Object.values(shoppingCart)); // 使用 Object.values() 取得購物車商品陣列

    // const router = useRouter()
    // const id = router.query.sid;
    // const shopId = parseInt(id)
    const cartitem = localStorage.getItem('order')
    // console.log(cartitem);

    const menuItems = JSON.parse(cartitem) || 0;
    // console.log(menuItems);

    const menuItemsArray = Object.values(menuItems);
    // console.log(menuItemsArray);
    const [products, setProducts] = useState(menuItemsArray)
    //商品數量-增加
    const handleAdd = (item) => {

        // if (products.filter(item => item.shop_id === shopId) === []) localStorage.removeItem('order')

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
                togodate: togodate,
                togotime: togotime,
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
                    togodate: togodate,
                    togotime: togotime,
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

        setProducts(prevProducts => {
            return prevProducts.filter(product => product.itemId !== item.itemId);
        });
    }

    const getTotalAmount = () => {
        return products.reduce((total, product) => total + (product.amount * product.price), 0);
    }

    return (
        <>

            {products.length > 0 ?
                <div>
                    {
                        products.map((v) => {
                            const totalAmount = v.amount * v.price;
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
                                                    ${totalAmount}
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
                    <div className={style.totalprice}>總金額: ${getTotalAmount()}</div>
                </div>
                :
                <div className={style.cartemptydiv}>
                    <GiShoppingCart className={style.cartemptyicon} />
                    <div className={style.cartemptytext}>購物車中沒有商品</div>
                </div>
            }

            {products.length > 0 && togodate && togotime ?
                <div className={style.togotime}>
                    <BsFillCalendar3WeekFill className='me-1' /> 取餐時間 {togodate} {togotime}</div>
                : ''
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
