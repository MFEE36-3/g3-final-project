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
import { useState } from 'react';



function consoleDate(date) {
    console.log(date);
    console.log(date['$d']);

    const daytostring = dayjs(date['$d']).format('YYYY-MM-DD');
    console.log(daytostring);
}

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

export default function OpenShopForm({ openForm, handleopenFormClose, opentargetstore, data }) {


    const [opensheet,setOpensheet] = useState({
        "open_member_id":2,
        "meet_time":"",
        "meet_place":"台大",
        "target_store":0,
        "tip":0,
        "open_status":0
    });

    return (<>

        <Dialog open={openForm} onClose={handleopenFormClose} >

            {/* 記得要用全部的資料去map 不是篩選後的 */}
            {data.filter((v) => opentargetstore === v.sid).map((v) => {
                return (<>
                    <DialogTitle className={styles.open_title}>開團單</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={styles.labels}>
                            <div>開團店家：</div>
                            <div className={styles.shopname}>{v.shop}</div>
                        </DialogContentText>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className={styles.labels}>
                                <DatePicker
                                    defaultValue={dayjs(Date.now())}
                                    onChange={consoleDate}
                                    minDate={dayjs(Date.now())}
                                    fullWidth
                                    label='取餐日期'
                                    sx={mui_style}
                                />
                            </div>
                            <div className={styles.labels}>
                                <TimePicker
                                    className='marginout'
                                    sx={mui_style}
                                    label='取餐時間'
                                    defaultValue={dayjs(Date.now()).add(30, 'minute')}   //預設30分鐘
                                //value={}  //看要不要給一個初始值(state之類ㄉ)
                                // onChange={(newValue) => setValue(dayjs(newValue['$d']).format('HH-mm-ss'))}
                                />
                            </div>
                            <div className={styles.labels}>
                                跑腿費：
                                <div className={styles.silder}>
                                    <Slider
                                        aria-label="Always visible"
                                        defaultValue={20}
                                        max={50}
                                        getAriaValueText={valuetext}
                                        step={5}
                                        marks={marks}
                                        valueLabelDisplay="on"
                                        onChange={(e) => { console.log(e.target.value) }}
                                        sx={slider_style}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>

                        <div className={styles.labels}>
                            <TextField fullWidth sx={mui_style} label='面交地點'/>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Btn text='開團!' padding='5px 20px' sx={{ width: '100%' }} onClick={()=>{
                                fetch(process.env.API_SERVER+'/buyforme/openforyou',{
                                    method: 'POST',
                                    body: JSON.stringify(opensheet),
                                    headers:{'Content-Type':'application/json'},
                                })
                                .then(r=>r.json())
                                .then(obj=>{
                                console.log(JSON.stringify(obj, null, 4))})
                            }}/>
                        </div>

                    </DialogContent>
                </>)
            })}


            <DialogActions>
                {/* <div onClick={handlebuyformeClose}>Cancel</div>
    <div onClick={handlebuyformeClose}>Subscribe</div> */}
            </DialogActions>
        </Dialog>
    </>)
};