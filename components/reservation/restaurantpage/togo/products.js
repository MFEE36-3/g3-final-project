import React from 'react'
// import togocards from '@/data/reservation/togocards.json'
import Card from 'react-bootstrap/Card';
import style from '@/styles/reservation/style.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


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

const Inputborder = styled.input`
  &:focus{
    outline:none
  }
`

export default function Products({ row, category, shoppingCart, setShoppingCart, togodate, setTogodate, togotime, setTogotime }) {

    const [itemdeatil, setItemdeatil] = useState(null);
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(1);
    // const [cart, setCart] = useLocalStorage("order", {})
    const pastcart = JSON.parse(localStorage.getItem('order')) || {};
    const router = useRouter()
    const id = router.query.sid;
    const shopId = parseInt(id)

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

    //塞進LocalStorage
    // const handleCart = (item) => {
    //     setOpen(false);
    //     const itemInfo = {
    //         itemId: item.food_id,
    //         itemName: item.food_title,
    //         src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
    //         price: item.food_price,
    //         amount: num
    //     }
    //     setCart({
    //         ...cart,
    //         [item.food_id]: itemInfo
    //     });
    // }

    // 將選中的商品資訊存儲在狀態中

    const handleAddToCart = (item) => {

        if (!togodate || !togotime) {
            Swal.fire({
                icon: 'warning',
                // title: '請先選擇訂餐日期及時間',
                text: '請先選擇訂餐日期及時間',
                confirmButtonText: '確定',
            })
            return;
        }

        const nowcart = Object.entries(pastcart).map(item => item.pop());
        // console.log(Object.values(nowcart))
        if (Object.values(nowcart)[0]?.shop_id !== shopId) {
            localStorage.removeItem('order')
        }



        // //更新LocalStorage
        // const oldCart = JSON.parse(localStorage.getItem('order'))
        // localStorage.setItem('order', JSON.stringify({
        //     ...oldCart,
        //     [item.food_id]: {
        //         itemId: item.food_id,
        //         itemName: item.food_title,
        //         src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
        //         price: item.food_price,
        //         amount: (oldCart[item.food_id]?.amount || 0) + 1,
        //         togodate: togodate,
        //         togotime: togotime,
        //     }
        // }))

        // //更新LocalStorage
        // const oldCart = JSON.parse(localStorage.getItem('order'))
        // localStorage.setItem('order', JSON.stringify({
        //     ...oldCart,
        //     [item.food_id]: {
        //         itemId: item.food_id,
        //         itemName: item.food_title,
        //         src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
        //         price: item.food_price,
        //         amount: 1,
        //         togodate: togodate,
        //         togotime: togotime,
        //     }
        // }))

        // 檢查購物車中是否已有該商品

        const oldCart = JSON.parse(localStorage.getItem('order')) || {};
        const itemId = item.food_id;
        const updatedItem = {
            itemId: itemId,
            itemName: item.food_title,
            src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
            price: item.food_price,
            amount: (oldCart[itemId]?.amount || 0) + 1,
            togodate: togodate,
            togotime: togotime,
            shop_id: row.detail.sid,
        };
        // console.log(updatedItem);
        // 更新LocalStorage
        localStorage.setItem('order', JSON.stringify({
            ...oldCart,
            [itemId]: updatedItem,
        }));


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
                                    <Card.Title>{v.food_title}</Card.Title>
                                    <Card.Text className='fs-xl-3 text-xl-danger'>${v.food_price}</Card.Text>
                                    <div className="d-flex align-item-center justify-content-between">
                                        <Button
                                            style={{
                                                width: '100%',
                                                fontSize: '12px',
                                                background: '#911010',
                                                borderRadius: 20,
                                                border: 0,
                                                color: 'white',
                                                padding: '5px',
                                            }}
                                            onClick={() => handleAddToCart(v)}
                                        >
                                            加入購物車
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
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

            </div>
        </>
    )
}
