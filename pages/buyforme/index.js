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
import zIndex from "@mui/material/styles/zIndex";
import { HiOutlineChat } from "react-icons/hi";
import CustomizedSwitches from "@/components/buyforme/switch";
import { Chat } from "@mui/icons-material";
import OpenShopForm from "@/components/buyforme/openshopform";
import dayjs from "dayjs";
import { useRouter } from "next/router";


const search_input_style = {

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
        fontWeight: '900',
        height: 49,
        width: 225,
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

}

const chat_input_style = {
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
        fontSize: 'var(--h6)',
        fontWeight: 900,
        height: 40,
        width: 200,
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
}


//後端先取得資料庫資料
export async function getStaticProps() {

    //拿店家資料
    const response = await fetch(process.env.API_SERVER + '/buyforme');
    const data = await response.json();

    //拿店家評論
    const response2 = await fetch(process.env.API_SERVER + '/buyforme/review');
    const review_data = await response2.json();

    //拿開團單
    const response3 = await fetch(process.env.API_SERVER + '/buyforme/openforyou');
    const open_sheet_data = await response3.json();


    return {
        props: {
            initialData: data.rows,
            review_data: review_data,
            open_sheet_data: open_sheet_data.rows,
        },
    };
}

const Buyforme = ({ initialData, review_data, open_sheet_data }) => {

    const [originaldata, setOriginaldata] = useState(initialData);
    const [data, setData] = useState(initialData);
    const [checkbuyforme, setCheckbuyforme] = useState(false);
    const [openorder, setOpenorder] = useState(open_sheet_data);
    const [openbuyforme, setOpenbuyforme] = useState(false);
    const [targetstore, setTargetstore] = useState(0);
    const [shopfoods, setShopfoods] = useState([]);
    const [testV, setTestV] = useState(6666666);
    const [chat, setChat] = useState('說點什麼......');
    const [openchat, setOpenchat] = useState(false);
    const [mapcolor, setMapcolor] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [opentargetstore, setOpentargetstore] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [destination, setDestination] = useState({});

    const router = useRouter();

    useEffect(() => {
        //console.log(router.query.keyword);
        if (router.query.keyword) {
            setKeyword(router.query.keyword);
            setData(() => originaldata.filter(v => v.shop.includes(router.query.keyword)));
        } else {
            setData(() => originaldata);
        }
    }, [router.query])


    const handlebuyformeClose = () => {
        setOpenbuyforme(false);
    };

    const handleopenFormClose = () => {
        setOpenForm(false);
    };

    function getLatlng(site) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${site}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
            .then(r => r.json())
            .then(obj => setDestination(obj.results[0].geometry.location));
    };

    return (<>
        <GoogleMapComponent data={data} chat={chat} mapcolor={mapcolor} openForm={openForm} setOpenForm={setOpenForm} setOpentargetstore={setOpentargetstore} review_data={review_data} destination={destination}/>

        <div className={styles.inputBox}>
            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder='搜尋美食...'
                sx={search_input_style}
                defaultValue={router.query.keyword ? router.query.keyword : ''}
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key !== 'Enter') return;
                    if (e.target.value === '') {
                        router.push('');
                    } else {
                        router.push('?keyword=' + e.target.value);
                    }
                }}
            />
        </div>
        <Image src={sausageLeft} className={styles.sausageLeft} priority alt='inputbox' />
        <Image src={sausageRight} className={styles.sausageRight} priority alt='inputbox' />

        <OpenIconSpeedDial />


        <div className={checkbuyforme === false ? styles.buyforme_hint : styles.buyforme_hint_active}>
            目前揪團數：{openorder.filter((v) => {
                if (Date.now() > new Date(v.meet_time)) return;
                return v
            }).length}
        </div>

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

                                const compareTime = new Date(v.meet_time);

                                if (Date.now() > compareTime) return;
                                return (
                                    <tr key={v.open_sid}>
                                        <td>{v.open_sid}</td>
                                        <td>{v.nickname}</td>
                                        <td className={v.shop.length > 15 ? styles.overlength_td : ''}>{v.shop}</td>
                                        <td>{dayjs(v.meet_time).format('MM-DD HH:mm')}</td>
                                        <td className={styles.meet_place_td} onClick={()=>getLatlng(v.meet_place)}>{v.meet_place}</td>
                                        <td>{v.tip !== 0 ? v.tip : '免費'}</td>
                                        <td><Btn text='跟團go!' padding='5px 10px' fs='var(--h9)' sx={{ zIndex: 0 }} onClick={() => {
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

            {/* 記得要用全部的資料去map 不是篩選後的 */}
            {originaldata.filter((v) => targetstore === v.sid).map((v) => {
                return (<>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <div>
                            {JSON.stringify(v)}
                        </div>
                        <div style={{ width: '100%' }}>
                            <InputArea onChange={(e) => { console.log('123'); setTestV(e.target.value) }} value={testV} fullWidth />
                        </div>
                    </DialogContent>
                </>)
            })}


            <DialogActions>
                {/* <div onClick={handlebuyformeClose}>Cancel</div>
                <div onClick={handlebuyformeClose}>Subscribe</div> */}
            </DialogActions>
        </Dialog>

        <div className={styles.chat_inputbox} style={{ display: `${openchat ? 'block' : 'none'}` }}>
            <TextField sx={chat_input_style} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setChat(e.target.value ? e.target.value : '說點什麼......');
                }
            }} />
        </div>
        <HiOutlineChat className={styles.chat_inputbtn} onClick={() => { setOpenchat((prev) => !prev) }} />
        <div className={styles.switch_box}>
            <CustomizedSwitches mapcolor={mapcolor} setMapcolor={setMapcolor} />
        </div>

        <OpenShopForm openForm={openForm} handleopenFormClose={handleopenFormClose} opentargetstore={opentargetstore} data={data} />



    </>)
}

export default Buyforme;

Buyforme.getLayout = BlankLayout;