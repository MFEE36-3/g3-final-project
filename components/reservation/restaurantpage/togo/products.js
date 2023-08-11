import React from 'react'
// import togocards from '@/data/reservation/togocards.json'
import Card from 'react-bootstrap/Card';
import style from '@/styles/reservation/style.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Image from 'next/image';
import filled_walkbag_middle from '@/public/main_page/filled_walkbag_middle.svg';


const stylemodal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Products({ row, category, shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime, item, setItem }) {

    const [itemdeatil, setItemdeatil] = useState(null);
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(1);
    const pastcart = JSON.parse(localStorage.getItem('order')) || {};
    const router = useRouter()
    const id = router.query.sid;
    const shopId = parseInt(id)

    //增加商品效果用
    const [showAddText, setShowAddText] = useState({});

    const handleOpen = (item) => {
        setItemdeatil(item);
        setOpen(true);
        setNum(1);
    };

    const handleClose = () => setOpen(false);

    //判斷商品category
    const filterData = row.fooditems.filter((v) => {
        if (category < 99) {
            return v.food_cate === category
        } else {
            return v.food_cate < category
        }
    }
    );

    const handleAddToCart = (item) => {

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

        if (!togodate || !togotime) {
            Swal.fire({
                icon: 'warning',
                text: '請先選擇訂餐日期及時間',
                confirmButtonText: '確定',
            })
            return;
        }

        // if (localStorage.getItem('order') && Object.values(JSON.parse(localStorage.getItem('order')))[0].shop_id !== shopId) {

        //     if (localStorage.getItem('order')) {

        //         Swal.fire({
        //             icon: 'warning',
        //             title: '購物車中已有其他餐廳商品',
        //             text: '要清空購物車嗎？',
        //             showCancelButton: true,
        //             confirmButtonText: '確定',
        //             cancelButtonText: '返回',
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 localStorage.removeItem('order')

        //                 const oldCart = JSON.parse(localStorage.getItem('order')) || {};
        //                 const itemId = item.food_id;
        //                 const updatedItem = {
        //                     itemId: itemId,
        //                     shop: row.detail.shop,
        //                     itemName: item.food_title,
        //                     src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
        //                     price: item.food_price,
        //                     amount: (oldCart[itemId]?.amount || 0) + 1,
        //                     togodate: togodate,
        //                     togotime: togotime,
        //                     shop_id: row.detail.sid,
        //                 };
        //                 // console.log(updatedItem);
        //                 // 更新LocalStorage
        //                 localStorage.setItem('order', JSON.stringify({
        //                     ...oldCart,
        //                     [itemId]: updatedItem,
        //                 }));

        //             }
        //         })
        //         return;
        //     }
        // }


        if (localStorage.getItem('order')) {
            if (Object.keys(JSON.parse(localStorage.getItem('order'))).length === 0) return

            if (localStorage.getItem('order') && Object.values(JSON.parse(localStorage.getItem('order')))[0].shop_id !== shopId) {

                if (localStorage.getItem('order')) {

                    Swal.fire({
                        icon: 'warning',
                        title: '購物車中已有其他餐廳商品',
                        text: '要清空購物車嗎？',
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        cancelButtonText: '返回',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('order')

                            const oldCart = JSON.parse(localStorage.getItem('order')) || {};
                            const itemId = item.food_id;
                            const updatedItem = {
                                itemId: itemId,
                                shop: row.detail.shop,
                                itemName: item.food_title,
                                src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
                                price: item.food_price,
                                amount: (oldCart[itemId]?.amount || 0) + 1,
                                togodate: togodate,
                                togotime: togotime,
                                shop_id: row.detail.sid,
                            };
                            // 更新LocalStorage
                            localStorage.setItem('order', JSON.stringify({
                                ...oldCart,
                                [itemId]: updatedItem,
                            }));
                        }
                    })
                    return;
                }
            }
        }

        // if (localStorage.getItem('order')) {

        //     if (Object.keys(JSON.parse(!localStorage.getItem('order'))).length !== 0) {

        //         if (localStorage.getItem('order') && Object.values(JSON.parse(localStorage.getItem('order')))[0].shop_id !== shopId) return
        //     }
        // }

        // 檢查購物車中是否已有該商品

        const oldCart = JSON.parse(localStorage.getItem('order')) || {};
        const itemId = item.food_id;
        const updatedItem = {
            itemId: itemId,
            shop: row.detail.shop,
            itemName: item.food_title,
            src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
            price: item.food_price,
            amount: (oldCart[itemId]?.amount || 0) + 1,
            togodate: togodate,
            togotime: togotime,
            shop_id: row.detail.sid,
        };

        // 更新LocalStorage
        localStorage.setItem('order', JSON.stringify({
            ...oldCart,
            [itemId]: updatedItem,
        }));

        setItem({ ...item, updatedItem })



        //顯示商品增加效果
        setShowAddText(prevShowAddText => ({
            ...prevShowAddText,
            [item.food_id]: true,
        }));
        setTimeout(() => {
            setShowAddText(prevShowAddText => ({
                ...prevShowAddText,
                [item.food_id]: false,
            }));
        }, 1000);


        // 檢查購物車中是否已有該商品
        if (item.food_id in shoppingCart) {

            // 若有則更新數量
            setShoppingCart(prevCart => {

                return ({
                    ...prevCart,
                    [item.food_id]: {
                        ...prevCart[item.food_id],
                        amount: (prevCart[item.food_id].amount || 0) + 1,
                    },
                })
            });


        } else {
            // 若無則新增該商品到購物車，並初始化數量為 num
            setShoppingCart(prevCart => {

                return ({
                    ...prevCart,
                    [item.food_id]: {
                        ...item,
                        amount: 1,
                    },
                })
            });

        }


    };

    return (
        <>
            {filterData.length > 0 ?
                <div className={style.togomain}>
                    <div className={style.togocontent}>
                        {filterData.map((v) => {
                            return (
                                <Card
                                    className={`${style.card2}`}
                                    key={v.food_id}
                                >
                                    <div className={style.carddiv} onClick={() => handleOpen(v)}>
                                        <Card.Img
                                            variant="top"
                                            src={`${process.env.API_SERVER}/img/res-img/${v.food_img}`}
                                            className={`${style.cardimg}`}
                                        />
                                        <div className={style.togocardtext}>查看餐點</div>
                                    </div>
                                    <div className='px-1 py-2'>
                                        <Card.Title><span style={{ fontWeight: 600 }}>{v.food_title}</span></Card.Title>
                                        <Card.Text>${v.food_price}</Card.Text>
                                        <div className={style.additembutton}>
                                            <Button
                                                style={{
                                                    width: '100%',
                                                    fontSize: '12px',
                                                    background: '#911010',
                                                    lineHeight: '20px',
                                                    borderRadius: 20,
                                                    border: 0,
                                                    color: 'white',
                                                    padding: '5px',
                                                    fontWeight: 900,
                                                }}
                                                onClick={() => handleAddToCart(v)}
                                            >
                                                <div className={`${style.additem} ${showAddText[v.food_id] ? style.showplus : ''}`} >+1</div>
                                                加入購物車
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
                :
                <div className={style.noitemdiv}>
                    <Image src={filled_walkbag_middle} className={style.noitemimg} alt='filled_walkbag_middle' />
                    <p className={style.noitemtext}>無此分類商品！</p>
                </div>
            }


            {/* Modal視窗 */}
            {itemdeatil && <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='container-fulid '
            >
                <Box sx={stylemodal} className='d-flex row'>
                    <div className='col-7 h-100 overflow-hidden object-fit-cover'>
                        <img src={`${process.env.API_SERVER}/img/res-img/${itemdeatil.food_img}`} className='w-100 h-100' ></img>
                    </div>
                    <div className='col-5 h-100'>
                        <Typography id="modal-modal-title" component="h2" className={style.modaltitle}>
                            {itemdeatil.food_title}
                        </Typography>
                        <Typography id="modal-modal-title" component="h2" className={style.modaltext}>
                            {itemdeatil.food_des}
                        </Typography>
                        <Typography id="modal-modal-description" className={style.modalprice}>
                            售價: {itemdeatil.food_price}
                        </Typography>
                    </div>
                </Box>
            </Modal>}


        </>
    )
}
