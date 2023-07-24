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






const ramens = [
    {
        shop: "大稻埕魯肉飯", latitude
            : 25.0509692896927, longitude: 121.514657965568, sid: 1, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "滷肉飯店", latitude
            : 25.0519848661452, longitude: 121.545149955878, sid: 2, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "日日香小館", latitude
            : 25.0291015596711, longitude: 121.54070734974, sid: 3, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "林東芳牛肉麵", latitude
            : 25.0472560275676, longitude: 121.543080631394, sid: 4, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "頂好哨子麵", latitude
            : 25.0422643891525, longitude: 121.546287823781, sid: 5, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "紅粟上海經典小吃", latitude
            : 24.9810826373594, longitude: 121.523416460177, sid: 6, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "宵夜·排骨炒飯", latitude
            : 24.996707774961, longitude: 121.511260168782, sid: 8, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "入魂燒味燒臘餐廳", latitude
            : 25.0083616170896, longitude: 121.515609696722, sid: 7, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "紅昌吉豬血湯", latitude
            : 25.065831499499012, longitude: 121.51676609152237, sid: 9, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
    {
        shop: "今大滷肉飯", latitude
            : 25.064414236259736, longitude: 121.4915471374361, sid: 10, res_desc: "古色古香，魚龍混雜的裝潢，傳統經典的中式餐廳。"
    },
];

const open_for_you = [
    { open_sid: 1, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 1, shop: '烹星', tip: '20' },
    { open_sid: 2, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 2, shop: '烹星', tip: '30' },
    { open_sid: 3, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大後門', target_store: 3, shop: '阿英羊肉羹', tip: '20' },
    { open_sid: 4, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 4, shop: '烹星', tip: '20' },
    { open_sid: 5, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大側門', target_store: 5, shop: '麥當勞', tip: '20' },
    { open_sid: 6, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大正門', target_store: 6, shop: '烹星', tip: '20' },
    { open_sid: 7, open_member_id: 1, open_member_name: '小呆呆', meet_time: '2023-08-16 12:00', meet_place: '台大男一舍', target_store: 7, shop: '佐藤咖哩', tip: '25' },
];


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


//後端先取得資料庫的商家資料
export async function getStaticProps() {
    const response = await fetch(process.env.API_SERVER + '/buyforme');
    const data = await response.json();

    return {
        props: {
            initialData: data.rows,
        },
    };
}

const Buyforme = ({ initialData }) => {

    const [originaldata, setOriginaldata] = useState(initialData);
    const [data, setData] = useState(initialData);
    const [checkbuyforme, setCheckbuyforme] = useState(false);
    const [openorder, setOpenorder] = useState(open_for_you);
    const [openbuyforme, setOpenbuyforme] = useState(false);
    const [targetstore, setTargetstore] = useState(0);
    const [shopfoods, setShopfoods] = useState([]);
    const [testV, setTestV] = useState(6666666);
    const [chat, setChat] = useState('說點什麼......');
    const [openchat, setOpenchat] = useState(false);
    const [mapcolor, setMapcolor] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [opentargetstore, setOpentargetstore] = useState(0);





    // useEffect(() => {
    //     // targetstore改了之後 去後端拿資料改shopfoods
    //     const getshop = async () => {
    //         await fetch(process.env.API_SERVER + '/buyforme')
    //             .then(r => r.json())
    //             .then(obj => {setData(obj.rows); console.log(obj)})
    //     }

    //     getshop();
    // }, [])


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

    const handleopenFormClose = () => {
        setOpenForm(false);
    };

    return (<>
        <GoogleMapComponent data={data} chat={chat} mapcolor={mapcolor} openForm={openForm} setOpenForm={setOpenForm} setOpentargetstore={setOpentargetstore} />

        <div className={styles.inputBox}>
            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder='搜尋美食...'
                sx={search_input_style}
                onBlur={(e) => {
                    //if(e.key !== 'Enter') return;
                    if (e.target.value === '') {
                        setData(() => originaldata)
                    } else {
                        setData(() => originaldata.filter(v => v.shop.includes(e.target.value)));
                        console.log(e.target.value)
                    }
                }}
            />
        </div>
        <Image src={sausageLeft} className={styles.sausageLeft} priority alt='inputbox' />
        <Image src={sausageRight} className={styles.sausageRight} priority alt='inputbox' />

        <OpenIconSpeedDial />


        <div className={checkbuyforme === false ? styles.buyforme_hint : styles.buyforme_hint_active}>目前揪團數：{openorder.length}</div>

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
            {ramens.filter((v) => targetstore === v.sid).map((v) => {
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