import GoogleMapComponent from "@/components/buyforme/googlemap-component";
import BlankLayout from "@/components/layout/blank-layout";
import Image from "next/image";
import styles from '@/styles/buyforme/map/map.module.css'
import sausageLeft from '@/public/main_page/half-sausage-left.svg';
import sausageRight from '@/public/main_page/half-sausage-right.svg';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import OpenIconSpeedDial from '@/components/buyforme/speed-dial'
import walkbag from '@/public/buyforme/map/walkbag.svg'
import Btn from "@/components/common/btn";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputArea from "@/components/common/input";



const ramens = [
    { shop: "双豚ラーメン", lat: 25.027492494837038, lng: 121.46519250548808, id: 1 },
    { shop: "烹星", lat: 25.05607, lng: 121.52514, id: 2 },
    { shop: "Okaeriお帰り你回來啦拉麵", lat: 25.04392, lng: 121.55372, id: 3 },
];

const open_for_you = [
    { open_sid: 1, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 1, shop: '烹星', tip: '20' },
    { open_sid: 2, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 2, shop: '烹星', tip: '30' },
    { open_sid: 3, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大後門', target_store: 3, shop: '阿英羊肉羹', tip: '20' },
    { open_sid: 4, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 4, shop: '烹星', tip: '20' },
    { open_sid: 5, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大側門', target_store: 5, shop: '麥當勞', tip: '20' },
    { open_sid: 6, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 6, shop: '烹星', tip: '20' },
    { open_sid: 7, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大男一舍', target_store: 7, shop: '佐藤咖哩', tip: '25' },
]

const Buyforme = () => {

    const [data, setData] = useState(ramens);
    const [checkbuyforme, setCheckbuyforme] = useState(false);
    const [openorder, setOpenorder] = useState(open_for_you);
    const [openbuyforme, setOpenbuyforme] = useState(false);
    const [targetstore, setTargetstore] = useState(0);
    const [shopfoods, setShopfoods] = useState([]);
    const [testV, setTestV] = useState(6666666);


    useEffect(() => {
        // targetstore改了之後 去後端拿資料改shopfoods
        const getfood = async () => {
            // await fetch(process.env.API_SERVER + '/buyforme/food/' + targetstore)
            //     .then(r => r.json())
            //     .then(obj => setShopfoods(obj))
            console.log(targetstore)
        }

        getfood();

    }, [targetstore])


    const handlebuyformeClose = () => {
        setOpenbuyforme(false);
    };

    return (<>
        <GoogleMapComponent data={data} />

        <div className={styles.inputBox}>
            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder='搜尋美食...'
                sx={{
                    '&:hover fieldset': {
                        backgroundColor: 'rgba(250,179,179,0.2)',
                        borderColor: '#FAB3B3'
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
                        fontSize: 'var(--h5)',
                        fontFamily: 'var(--ff1)',

                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--sub-color)'
                    },
                    '& label.Mui-focused,label': {
                        color: 'var(--main-color)',
                    },
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                        padding: '0px 14px'
                    },
                }}
                inputProps={{
                    style: {
                        height: 50,
                        width: 200,
                    },
                }}

                onBlur={(e) => {
                    //if(e.key !== 'Enter') return;
                    if (e.target.value === '') {
                        setData(() => ramens)
                    } else {
                        setData(() => ramens.filter(v => v.shop.includes(e.target.value)));
                        console.log(e.target.value)
                    }
                }}
            />
        </div>
        <Image src={sausageLeft} className={styles.sausageLeft} priority alt='inputbox' />
        <Image src={sausageRight} className={styles.sausageRight} priority alt='inputbox' />

        <OpenIconSpeedDial />


        <div className={checkbuyforme === false ? styles.buyforme_hint : styles.buyforme_hint_active}>目前揪團數：6</div>

        <div className={checkbuyforme === false ? styles.buyforme_infobox_hide : styles.buyforme_infobox}>
            <div className={styles.buyforme_tabletitle}>誰在揪團</div>

            {openorder.length !== 0 ?
                <div className={styles.buyforme_tablebox}>
                    <table className={`table ` + styles.buyforme_table}>
                        <thead>
                            <tr>
                                <th>開團編號</th>
                                <th>開團人</th>
                                <th>開團店家</th>
                                <th>取餐時間</th>
                                <th>取餐地點</th>
                                <th>跑腿費</th>
                                <th style={{ zIndex: 1 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {openorder.map((v, i) => {
                                return (
                                    <tr key={v.open_sid}>
                                        <td>{v.open_sid}</td>
                                        <td>{v.open_member_name}</td>
                                        <td>{v.shop}</td>
                                        {/* 應該是店家sid 記得要處理轉成店家名稱 應該是後端轉ㄅ */}
                                        <td>{v.meet_time}</td>
                                        <td>{v.meet_place}</td>
                                        <td>{v.tip}</td>
                                        <td><Btn text='跟團go!' padding='5px 10px' fs='var(--h9)' onClick={() => {
                                            setOpenbuyforme(true);
                                            setTargetstore(v.target_store);
                                        }} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <div className={styles.nogroup}>目前沒團可以跟哦~</div>
            }
        </div>

        <Image src={walkbag} className={styles.walkbag} alt='buyforme' priority onClick={() => { setCheckbuyforme((prev) => !prev) }} />

        <Dialog open={openbuyforme} onClose={handlebuyformeClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                {data.map((v) => {
                    if (targetstore === v.id) return (
                        <div>
                            {JSON.stringify(v)}
                        </div>
                    )
                })}
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <div style={{ width: '100%' }}>
                    <InputArea onChange={(e) => { console.log('123'); setTestV(e.target.value) }} value={testV} fullWidth />
                </div>
            </DialogContent>
            <DialogActions>
                {/* <div onClick={handlebuyformeClose}>Cancel</div>
                <div onClick={handlebuyformeClose}>Subscribe</div> */}
            </DialogActions>
        </Dialog>


    </>)
}

export default Buyforme;

Buyforme.getLayout = BlankLayout;