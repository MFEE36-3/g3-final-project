import { useState, useEffect } from 'react'
import style from '@/styles/reservation/style.module.css'
import { Button } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import { GiShoppingCart, GiShop } from "react-icons/gi";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import dayjs from 'dayjs';

export default function ShoppingCart({ shoppingCart, setShoppingCart, row, togodate, setTogodate, togotime, setTogotime, shopcount, setShopCount }) {

    const router = useRouter();
    const cartitem = localStorage.getItem('order')

    const menuItems = JSON.parse(cartitem) || 0;

    const menuItemsArray = Object.values(menuItems);

    const [products, setProducts] = useState(menuItemsArray)

    const localdatetime = JSON.parse(localStorage.getItem('order')) || {};
    const nowdatetime = Object.entries(localdatetime).map(item => item.pop());



    if (Object.values(nowdatetime).length > 0) {
        setTogodate(Object.values(nowdatetime)[0]?.togodate);
        setTogotime(Object.values(nowdatetime)[0]?.togotime);
    }

    //商品數量-增加
    const handleAdd = (item) => {

        //更新LocalStorage
        const oldCart = JSON.parse(localStorage.getItem('order'))
        const updatedAmount = item.amount + 1;
        localStorage.setItem('order', JSON.stringify({
            ...oldCart,
            [item.itemId]: {
                ...item,
                amount: updatedAmount,
            }
        }))

        setProducts(prevProuducts => {
            return prevProuducts.map(product => {
                if (product.itemId === item.itemId) {
                    return {
                        ...product, amount: updatedAmount
                    }
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
            const updatedAmount = item.amount - 1;
            localStorage.setItem('order', JSON.stringify({
                ...oldCart,
                [item.itemId]: {
                    ...item,
                    amount: updatedAmount,
                }
            }))


            setProducts(prevProuducts => {
                return prevProuducts.map(product => {
                    if (product.itemId === item.itemId && product.amount > 1) {
                        return {
                            ...product, amount: updatedAmount
                        }
                    }
                    return product;
                })
            })
        }
    }
    //商品數量-刪除
    const handleRemove = (item) => {

        //更新LocalStorage
        const oldCart = JSON.parse(localStorage.getItem('order'))
        delete oldCart[item.itemId];
        localStorage.setItem('order', JSON.stringify(oldCart));

        // 檢查localStorage是否為空
        if (Object.keys(oldCart).length === 0) {
            localStorage.removeItem('order');
            // localStorage.setItem('order', JSON.stringify({}));
        }

        setProducts(prevProducts => {
            return prevProducts.filter(product => product.itemId !== item.itemId);
        });
    }
    //商品總額計算
    const getTotalAmount = () => {
        return products.reduce((total, product) => total + (product.amount * product.price), 0);
    }
    //結帳按鈕
    const handleSendCart = () => {
        //判斷否登入
        const member = JSON.parse(localStorage.getItem('auth'));
        // console.log(member)
        if (!member?.sid) {
            Swal.fire({
                title: '請先登入',
                iconHtml: `<img src=${chocoCookie.src}>`,
                customClass: {
                    icon: 'sweetalert_icon'
                },
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: '前往登入',
                denyButtonText: '我再想想',
            }).then(
                function (result) {
                    if (result.value) router.push('/login')
                });
            return;
        }
        if (products.length !== 0) {
            router.push("/checkout?page=order")
        }
    }

    //判斷購物車中是否有商品
    useEffect(() => {
        // 無商品-設為0
        if (!localStorage.getItem('order')) {
            setShopCount(0);
        }
        // 有商品-更新數量
        if (localStorage.getItem('order')) {
            const items = JSON.parse(localStorage.getItem('order'))
            const count = Object?.values(items).length
            setShopCount(count);
        }
    }, [products])

    return (
        <>
            <div className={style.shoptitle}>
                <div>
                    {products.length !== 0 && <GiShop className={style.shoptitleicon} />}
                    {products[0]?.shop}
                </div>
            </div>
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
                    <div className={style.totalprice}>總金額： 
                    <div style={{color:'var(--main-color)'}}>${getTotalAmount()}</div>
                    </div>
                </div>
                :
                <div className={style.cartemptydiv}>
                    <GiShoppingCart className={style.cartemptyicon} />
                    <div className={style.cartemptytext}>購物車中沒有商品</div>
                </div>
            }

            {products.length > 0 ?
                <div className={style.togotime}>
                    <BsFillCalendar3WeekFill className='me-1' /> 取餐時間 
                    <div className='ms-3'>{togodate} {togotime}</div>
                </div>
                : ''
            }
            <div>
                {/* <Link href="/checkout?page=order"> */}
                <button className={style.cartsendbutton} style={{ display: products.length === 0 ? 'none' : 'block' }} onClick={handleSendCart}>
                    前往結帳
                </button>
                {/* </Link> */}
            </div>

        </>
    )
}
