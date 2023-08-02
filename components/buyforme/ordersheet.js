import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import styles from '@/styles/buyforme/ordersheet.module.css';
import dayjs from 'dayjs';
import Btn from '../common/btn';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const mui_style = {
    '&:hover fieldset': {
        backgroundColor: 'rgba(250,179,179,0.2)',
        borderColor: '#FAB3B3'
    },
    '& .MuiInputLabel-root': {
        fontSize: 'var(--h6)',
        fontWeight: 900,
        fontFamily: 'var(--ff1)'
    },
    '& .MuiSvgIcon-root': {
        color: 'var(--sub-color)'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--sub-color)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--sub-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--sub-color)',
        },
        fontSize: 'var(--h6)',
        fontWeight: 600,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--sub-color)'
    },
    '& label.Mui-focused,label': {
        color: 'var(--main-color)',
    },
    width: '100%',
}

const mui_select_style = {
    '&:hover .MuiOutlinedInput-notchedOutline': {
        backgroundColor: 'rgba(250,179,179,0.2)',
        borderColor: '#FAB3B3'
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--sub-color) !important',
    },
}

const menuItem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function OrderSheet({ openbuyforme, handlebuyformeClose, foodlist, opendetail }) {


    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const [ordersheet, setOrdersheet] = useState({
        "order_member_id": 0,
        "nickname": '',
        "mobile_number": '',   //order_amount後端給 ??
        "order_instructions": '',
        "open_status": 0,
        "order_detail": [],
        "open_sid": opendetail[1]
    });

    function changeNickname(nickname) {
        setOrdersheet((prev) => { return { ...prev, nickname: nickname } });
    }

    function changeMobileNumber(mobile_number) {
        setOrdersheet((prev) => { return { ...prev, mobile_number: mobile_number } });
    }

    function changeInstructions(order_instructions) {
        setOrdersheet((prev) => { return { ...prev, order_instructions: order_instructions } });
    }

    // 資料格式是物件裝陣列的寫法
    // function changeOrderDatail(food_quantity, food_id, food_title, food_price) {
    //     if (food_quantity === 0) {
    //         setOrdersheet((prev) => {
    //             const { [food_id]: _, ...restorder } = prev.order_detail;
    //             return { ...prev, order_datail: restorder }
    //         });
    //     } else {
    //         setOrdersheet((prev) => { return { ...prev, order_detail: { ...prev.order_detail, [food_id]: [food_title, food_quantity, food_price] } } });
    //     }
    // }

    // 資料格式是陣列裝物件的寫法
    function changeOrderDatail(food_quantity, food_id, food_title, food_price) {

        setOrdersheet((prev) => {
            return { ...prev, order_detail: prev.order_detail.filter((v) => v.food_id !== food_id) }
        });

        if (food_quantity === 0) return;

        setOrdersheet((prev) => {
            prev.order_detail.push({ food_id: food_id, food_title: food_title, food_quantity: food_quantity, food_price: food_price })
            return { ...prev, order_detail: prev.order_detail }
        });

    }

    // 每次進來恢復預設值
    useEffect(() => {
        if (openbuyforme)
            setOrdersheet({
                "order_member_id": 0,
                "nickname": '',
                "mobile_number": '',
                "order_instructions": '',
                "open_status": 0,
                "order_detail": [],
                "open_sid": opendetail[1]
            })


        // 用 AuthContext 或 localstorage 都可以
        if (!localStorage.getItem('auth')) return;
        const authData = JSON.parse(localStorage.getItem('auth'));
        setOrdersheet((prev) => { return { ...prev, order_member_id: authData.sid } })

    }, [openbuyforme])


    return (<>

        <Dialog open={openbuyforme} onClose={handlebuyformeClose} >

            <DialogTitle className={styles.open_title}>跟團單</DialogTitle>
            <DialogContent>
                <div className={styles.labels}>
                    <div>跟團店家：</div>
                    <div className={foodlist[0]?.shop.length > 10 ? styles.shopname_small : styles.shopname}>{foodlist[0]?.shop}</div>
                </div>

                <div>
                    {foodlist.map((v) => {
                        return (
                            <div className={styles.food_box} key={v.food_id}>
                                <div style={{ backgroundImage: `url(${process.env.API_SERVER}/img/res-img/${v.food_img})` }} className={styles.food_img}></div>
                                <div className={styles.food_right_box}>
                                    <div className={styles.food_name}>{v.food_title}</div>
                                    <div className={styles.food_des}>{v.food_des}</div>
                                    <div className={styles.food_price_number}>
                                        <div className={styles.food_price}>NT$ {v.food_price}</div>
                                        <FormControl sx={{ width: 100, '& .MuiFormLabel-root': { color: 'var(--main-color)', fontFamily: 'var(--ff1)' } }} size="small">
                                            <InputLabel>數量</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                //value={age}
                                                label="Age"
                                                onChange={(e) => changeOrderDatail(e.target.value, v.food_id, v.food_title, v.food_price)}
                                                sx={mui_select_style}
                                            >
                                                {menuItem.map((v) => {
                                                    return <MenuItem value={v} key={v}>{v}</MenuItem>
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {ordersheet.order_detail.length > 0 && (
                    <table className={styles.buy_table}>
                        <thead>
                            <tr className={styles.buy_items}>
                                <th>項次</th>
                                <th>商品及數量</th>
                                <th>小計</th>
                            </tr>
                        </thead>
                        {ordersheet.order_detail.map((v, i) => {
                            return (
                                <tbody key={v.food_id}>
                                    <tr className={styles.buy_items}>
                                        <td>{i + 1}</td>
                                        <td>{v.food_title} * {v.food_quantity}</td>
                                        <td>{v.food_price * v.food_quantity}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                        <tfoot>
                            <tr className={styles.buy_items + ' ' + styles.buy_footer}>
                                <td>Total</td>
                                <td>跑腿費 + {opendetail[0]}</td>
                                <td>{ordersheet.order_detail.reduce((prev, v) => prev + v.food_price * v.food_quantity, opendetail[0])}</td>
                            </tr>
                        </tfoot>
                    </table>
                )}


                <div className={styles.labels}>
                    <TextField fullWidth sx={mui_style} label='暱稱' placeholder='該怎麼稱呼你' onChange={(e) => changeNickname(e.target.value)} />
                </div>
                <div className={styles.labels}>
                    <TextField fullWidth sx={mui_style} label='聯絡方式' placeholder='手機 or 電話' onChange={(e) => changeMobileNumber(e.target.value)} />
                </div>
                <div className={styles.labels}>
                    <TextField fullWidth sx={mui_style} label='備註' placeholder='有什麼想說的？' onChange={(e) => changeInstructions(e.target.value)} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Btn text='跟團!' padding='5px 20px' sx={{ width: '100%' }} onClick={() => {

                        if (opensheet.meet_place === "") {
                            Swal.fire({
                                title: '請檢查所有欄位都有填寫哦~',
                                icon: 'warning',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            return;
                        }
                        if (opensheet.open_member_id === 0) {
                            Swal.fire({
                                title: '請先登入',
                                icon: 'warning',
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

                        fetch(process.env.API_SERVER + '/buyforme/openforyou', {
                            method: 'POST',
                            body: JSON.stringify(opensheet),
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(r => r.json())
                            .then(obj => {

                                if (obj.result.affectedRows !== 0) {
                                    Swal.fire({
                                        title: '跟團成功!',
                                        icon: 'success',
                                        showConfirmButton: false,
                                        showDenyButton: true,
                                        confirmButtonText: '前往結帳',
                                        denyButtonText: '晚點再說',
                                    }).then(
                                        function (result) {
                                            if (result.value) router.push('/checkout')
                                        });
                                }
                            })
                    }} />
                </div>

            </DialogContent>
        </Dialog >
    </>)
};