import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from '@/styles/buyforme/check_open_follow.module.css';
import dayjs from 'dayjs';
import Btn from '../common/btn';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';




export default function My_Open_Follow({ open_checklist, handleChecklistClose, open_or_follow }) {

    const [data, setData] = useState([]);
    const [follower, setFollower] = useState([]);

    useEffect(() => {

        const member = JSON.parse(localStorage.getItem('auth'));


        if (open_or_follow === 'follow') {
            fetch(process.env.API_SERVER + '/buyforme/buyforme', {
                method: 'POST',
                body: JSON.stringify({ member_id: member.sid }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(r => r.json())
                .then(obj => {
                    setData(obj.rows.filter((v) => v.foods.length !== 0));
                })
        } else if (open_or_follow === 'open') {
            fetch(process.env.API_SERVER + '/buyforme/openforyou_followers', {
                method: 'POST',
                body: JSON.stringify({ member_id: member.sid }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => { setFollower(data.rows); })
        }

    }, [open_or_follow])

    const reNewData = () => {
        const member = JSON.parse(localStorage.getItem('auth'));

        fetch(process.env.API_SERVER + '/buyforme/buyforme', {
            method: 'POST',
            body: JSON.stringify({ member_id: member.sid }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json())
            .then(obj => { setData(obj.rows); })
    }


    return (<>

        {open_or_follow === 'follow' ?
            <Dialog open={open_checklist} onClose={handleChecklistClose} >

                <DialogTitle className={styles.open_title}>我的跟團</DialogTitle>
                <DialogContent>
                    <div className={styles.labels}>
                        <div className={styles.buyforme_tablebox}>
                            <table className={`table ` + styles.buyforme_table}>
                                <thead>
                                    <tr>
                                        <th className={styles.text_nowrap}>開團人</th>
                                        <th className={styles.text_nowrap}>取餐地點</th>
                                        <th className={styles.text_nowrap}>取餐時間</th>
                                        <th className={styles.text_nowrap}>餐點內容</th>
                                        <th className={styles.text_nowrap}>訂單狀態</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((v) => {
                                        return (
                                            <tr key={v.open_sid + v.meet_place + Math.floor(10 * Math.random())}>
                                                <td className={styles.text_nowrap + ' ' + (v.nickname.length > 6 ? styles.small_font : '')}>{v.nickname}</td>
                                                <td className={v.meet_place.length > 5 ? styles.small_font : ''}>{v.meet_place}</td>
                                                <td>{dayjs(v.meet_time).format('MM-DD HH:mm')}</td>
                                                <td>{v.foods.map((food, i) => {
                                                    console.log(food[0] + food[1] * i)
                                                    return (<>
                                                        <div key={food[0] + food[1] * i} className={food[0].length > 6 ? styles.small_font : ''}>{food[0]} * {food[1]}</div>
                                                    </>)
                                                })}</td>
                                                <td>
                                                    {(v.order_status === 2)
                                                        ? '已完成'
                                                        : <Btn text='已取餐!' padding='5px 10px' fs='var(--h9)' onClick={() => {
                                                            Swal.fire({
                                                                title: `即將撥款 NT$${v.order_amount} 給跑腿者`,
                                                                icon: 'warning',
                                                                showDenyButton: true,
                                                                showCancelButton: false,
                                                                confirmButtonText: '沒有問題',
                                                                denyButtonText: '餐點未到',
                                                            }).then(
                                                                function (result) {
                                                                    if (result.value)
                                                                        fetch(process.env.API_SERVER + '/buyforme/finishbuyforme', {
                                                                            method: 'POST',
                                                                            body: JSON.stringify({
                                                                                order_sid: v.order_sid,
                                                                                open_member_id: v.open_member_id,
                                                                                order_amount: v.order_amount
                                                                            }),
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                        })
                                                                            .then(r => r.json())
                                                                            .then(obj => {
                                                                                if (obj.result.affectedRows !== 0 && obj.result2.affectedRows !== 0 && obj.result3.affectedRows !== 0) {
                                                                                    Swal.fire({
                                                                                        title: '撥款成功！請享用餐點',
                                                                                        icon: 'success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                    reNewData();
                                                                                }
                                                                            })
                                                                });
                                                        }} />}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </DialogContent>
            </Dialog >
            : open_or_follow === 'open' ?
                <Dialog open={open_checklist} onClose={handleChecklistClose} >

                    <DialogTitle className={styles.open_title}>我的揪團</DialogTitle>
                    <DialogContent>
                        <div className={styles.labels}>

                            <div className={styles.buyforme_tablebox}>
                                <table className={`table ` + styles.buyforme_table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.text_nowrap}>開單號</th>
                                            <th className={styles.text_nowrap}>取餐地點</th>
                                            <th className={styles.text_nowrap}>取餐時間</th>
                                            <th className={styles.text_nowrap}>店名</th>
                                            <th className={styles.text_nowrap}>跑腿費</th>
                                        </tr>
                                    </thead>
                                    {follower.map((v) => {
                                        return (<tbody key={v.open_sid} className={styles.tbody_open}>
                                            <tr className={styles.open_tr}>
                                                <td>{v.open_sid}</td>
                                                <td className={v.meet_place.length > 5 ? styles.small_font : ''}>{v.meet_place}</td>
                                                <td>{dayjs(v.meet_time).format('MM-DD HH:mm')}</td>
                                                <td className={styles.text_nowrap + ' ' + (v.shop.length > 10 ? styles.small_font : '')}>{v.shop}</td>
                                                <td>{v.tip === 0 ? '免費' : v.tip}</td>
                                            </tr>

                                            {v.orders.map((item, i) => {
                                                return (
                                                    <tr key={item[0] + item[3]} className={styles.detail_tr}>
                                                        <td>{i + 1}</td>
                                                        <td>{item[0]}</td>
                                                        <td className={styles.text_nowrap}>{item[1].map((detail, i) => {
                                                            return (<div key={detail[0] + i}>{detail.join('*')}</div>)
                                                        })}</td>
                                                        <td colSpan="2" className={styles.last_td}>
                                                            <div>{'電話： ' + item[4]}</div>
                                                            <div>{'備註： ' + item[2]}</div>
                                                            <div className={styles.amount}>{'訂單總額： ' + item[3]}</div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>)
                                    })}
                                </table>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog > : ''}


    </>)
};