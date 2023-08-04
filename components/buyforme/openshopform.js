import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputArea from '../common/input';
import { TextField } from '@mui/material';
import styles from '@/styles/buyforme/opensheet.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import Btn from '../common/btn';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';





function valuetext(value) {
    return value;
}

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

const mui_time_style = {
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
    // '& .MuiList-root':{
    //     '& .MuiMultiSectionDigitalClockSection-root':{
    //     width:74}
    // },
    width: '100%',
}

const slider_style = {
    color: 'var(--sub-color)',
    '& .MuiSlider-valueLabel': {
        backgroundColor: 'var(--main-color)',
    },
    '& .MuiSlider-valueLabelCircle': {
        transform: 'rotate(45deg)'
    },
    '& .MuiSlider-thumb:hover': {
        boxShadow: '0px 0px 0px 8px rgba(250,179,179,0.3)'
    },
    '& .MuiSlider-thumb.Mui-active': {
        boxShadow: '0px 0px 0px 14px rgba(250,179,179,0.3)'
    },
    '& .MuiSlider-markLabel': {
        color: 'var(--main-color)',
        fontWeight: 900,
        fontSize: 'var(--h9)',
        fontFamily: 'var(--ff1)'
    },
    '& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
        backgroundColor: 'var(--main-color)',
        transform: 'translateY(0px) rotate(-45deg)',
        borderRadius: '50% 50% 50% 0px',
        position: 'absolute',
        width: 30,
        height: 30,
        top: -45,
        left: 6,
        display: 'flex',
        overflow: 'hidden'
    },
}

const marks = [
    {
        value: 0,
        label: '免費',
    },
    {
        value: 50,
        label: '不能再貴',
    },
];

export default function OpenShopForm({ openForm, handleopenFormClose, opentargetstore, data, setOpenorder, setOpenForm }) {


    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const [opensheet, setOpensheet] = useState({
        "open_member_id": 0,
        "meet_date": dayjs(Date.now()).format('YYYY-MM-DD'),
        "meet_hour": dayjs(Date.now()).add(30, 'minute').format('HH:mm:ss'),   //預設30分鐘後
        "meet_place": "",
        "target_store": opentargetstore,
        "tip": 20,
        "open_status": 0
    });

    function changeDate(date) {
        const daytostring = dayjs(date['$d']).format('YYYY-MM-DD');
        setOpensheet((prev) => { return { ...prev, meet_date: daytostring } });
    }

    function changeHour(hour) {
        const daytostring = dayjs(hour['$d']).format('HH:mm:ss');
        setOpensheet((prev) => { return { ...prev, meet_hour: daytostring } });
    }

    function changeTip(tip) {
        setOpensheet((prev) => { return { ...prev, tip: tip } });
    }

    function changePlace(place) {
        setOpensheet((prev) => { return { ...prev, meet_place: place } });
    }

    // 每次進來恢復預設值
    useEffect(() => {
        if (openForm)
            setOpensheet({
                "open_member_id": 0,
                "meet_date": dayjs(Date.now()).format('YYYY-MM-DD'),
                "meet_hour": dayjs(Date.now()).add(30, 'minute').format('HH:mm:ss'),
                "meet_place": "",
                "target_store": opentargetstore,
                "tip": 20,
                "open_status": 0
            })


        // 用 AuthContext 或 localstorage 都可以
        if (!localStorage.getItem('auth')) return;
        const authData = JSON.parse(localStorage.getItem('auth'));
        setOpensheet((prev) => { return { ...prev, open_member_id: authData.sid } })

    }, [openForm])


    return (<>

        <Dialog open={openForm} onClose={handleopenFormClose} >

            {/* 記得要用全部的資料去map 不是篩選後的 */}
            {data.filter((v) => opentargetstore === v.sid).map((v) => {
                return (<div key={v.sid}>
                    <DialogTitle className={styles.open_title}>開團單</DialogTitle>
                    <DialogContent>
                        <div className={styles.labels}>
                            <div>開團店家：</div>
                            <div className={v.shop.length > 10 ? styles.shopname_small : styles.shopname}>{v.shop}</div>
                        </div>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className={styles.labels}>
                                <DatePicker
                                    value={dayjs(opensheet.meet_date)}
                                    onChange={changeDate}
                                    minDate={dayjs(Date.now())}
                                    fullWidth
                                    label='取餐日期'
                                    sx={mui_style}
                                />
                            </div>
                            <div className={styles.labels}>
                                <TimePicker
                                    className='marginout'
                                    sx={mui_time_style}
                                    label='取餐時間'
                                    value={dayjs('2023-08-16' + opensheet.meet_hour)}  //因為單純時間不是合法的時間格式 要加前綴
                                    onChange={changeHour}
                                //ampm={false}    //不要12小時制
                                />
                            </div>
                            <div className={styles.labels}>
                                跑腿費：
                                <div className={styles.silder}>
                                    <Slider
                                        aria-label="Always visible"
                                        value={opensheet.tip}
                                        max={50}
                                        getAriaValueText={valuetext}
                                        step={5}
                                        marks={marks}
                                        valueLabelDisplay="on"
                                        onChange={(e) => changeTip(e.target.value)}
                                        sx={slider_style}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>

                        <div className={styles.labels}>
                            <TextField fullWidth sx={mui_style} label='面交地點' placeholder='你要送到哪' onChange={(e) => changePlace(e.target.value)} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Btn text='開團!' padding='5px 20px' sx={{ width: '100%' }} onClick={() => {

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
                                                title: '開團成功!',
                                                icon: 'success',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                    })

                                setTimeout(async () => {
                                    const response3 = await fetch(process.env.API_SERVER + '/buyforme/openforyou');
                                    const open_sheet_data = await response3.json();
                                    setOpenorder(open_sheet_data.rows)
                                }, 1000)
                            }} />
                        </div>

                    </DialogContent>
                </div>)
            })}


            <DialogActions>
                {/* <div onClick={handlebuyformeClose}>Cancel</div>
    <div onClick={handlebuyformeClose}>Subscribe</div> */}
            </DialogActions>
        </Dialog>
    </>)
};