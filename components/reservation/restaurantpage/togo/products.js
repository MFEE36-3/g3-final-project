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

export default function Products({ row, category, shoppingCart, setShoppingCart }) {

    const [itemdeatil, setItemdeatil] = useState(null);
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(1);
    const [cart, setCart] = useLocalStorage("order", {})

    const handleOpen = (item) => {
        setItemdeatil(item);
        setOpen(true);
        setNum(1);
    };
    const handleClose = () => setOpen(false);

    //判斷商品category
    const filterData = row.fooditems.filter((v) => {
        if (category < 99) {
            return v.food_sid === category
        } else {
            return v.food_sid < category
        }
    }
    );

    //商品加減
    const plus = () => {
        setNum(prev => prev + 1)
    }
    const minus = () => {
        num > 1 && setNum(prev => prev - 1)
    }

    //塞進LocalStorage
    const handleCart = (item) => {
        setOpen(false);
        const itemInfo = {
            itemId: item.food_id,
            itemName: item.food_title,
            src: `${process.env.API_SERVER}/img/res-img/${item.food_img}`,
            price: item.food_price,
            amount: num
        }
        setCart({
            ...cart,
            [item.food_id]: itemInfo
        });
    }

    // 將選中的商品資訊存儲在狀態中
    const handleAddToCart = (item) => {
        // 檢查購物車中是否已有該商品
        if (item.food_id in shoppingCart) {
            // 若有則更新數量
            setShoppingCart(prevCart => ({
                ...prevCart,
                [item.food_id]: {
                    ...prevCart[item.food_id],
                    amount: (prevCart[item.food_id].amount || 0) + num,
                },
            }));
        } else {
            // 若無則新增該商品到購物車，並初始化數量為 num
            setShoppingCart(prevCart => ({
                ...prevCart,
                [item.food_id]: {
                    ...item,
                    amount: num,
                },
            }));
        }
        // 重置商品數量
        setNum(1);
        console.log(shoppingCart);
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
                            <Typography id="modal-modal-title" variant="h4" component="h2" className='h-25 d-flex justify-content-center pt-3'>
                                {itemdeatil.food_title}
                            </Typography>
                            {/* <Typography id="modal-modal-title" variant="h4" component="h2" className='h-25 d-flex justify-content-center pt-3'>
                                {itemdeatil.food_des}
                            </Typography> */}
                            <Typography id="modal-modal-description" variant="h5" className='d-flex flex-column justify-content-between h-75'>
                                <div className='d-flex justify-content-between mt-5'>
                                    <div className='fs-1 text-danger'>售價: {itemdeatil.food_price}</div>
                                </div>
                                <div className='position-relative'>
                                    <div className='w-75 d-flex align-items-center mx-auto border border-secondary border-2 justify-content-center rounded-5 mb-4 position-relative'>
                                        <Button variant="text" className='p-0 h-100 rounded-start-5 text-danger' onClick={minus}>
                                            <AiOutlineMinus className='fs-1 p-1' />
                                        </Button>
                                        <Inputborder className='w-50 fs-3 border-0 text-center mx-5' value={num} readOnly></Inputborder>
                                        <Button variant="text" className='p-0 rounded-end-5 text-danger' onClick={plus}>
                                            <AiOutlinePlus className='fs-1 p-1' />
                                        </Button>
                                    </div>
                                    <Button variant="text" className='border-0 rounded-3 w-100 text-light fs-3' style={{ background: "#911010" }} onClick={() => handleCart(itemdeatil)}>加入購物車</Button>
                                </div>
                            </Typography>
                        </div>
                    </Box>
                </Modal>
                }

            </div>
        </>
    )
}
