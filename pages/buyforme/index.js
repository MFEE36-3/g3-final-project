import GoogleMapComponent from "@/components/buyforme/googlemap-component";
import BlankLayout from "@/components/layout/blank-layout";
import Image from "next/image";
import styles from '@/styles/buyforme/map/map.module.css'
import sausageLeft from '@/public/main_page/half-sausage-left.svg';
import sausageRight from '@/public/main_page/half-sausage-right.svg';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import OpenIconSpeedDial from '@/components/buyforme/speed-dial'

const ramens = [
    { shop: "双豚ラーメン", lat: 25.027492494837038, lng: 121.46519250548808 },
    { shop: "烹星", lat: 25.05607, lng: 121.52514 },
    { shop: "Okaeriお帰り你回來啦拉麵", lat: 25.04392, lng: 121.55372 },
];

const Buyforme = () => {

    const [data, setData] = useState(ramens);



    return (<>
        <GoogleMapComponent data={data} />
        <Image src={sausageLeft} className={styles.sausageLeft} priority />
        <Image src={sausageRight} className={styles.sausageRight} priority />
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

        <OpenIconSpeedDial />


    </>)
}

export default Buyforme;

Buyforme.getLayout = BlankLayout;