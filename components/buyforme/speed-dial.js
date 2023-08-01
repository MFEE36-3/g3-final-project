import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import bubbleTea from '@/public/img_for_icon/bubble_tea.svg';
import chip from '@/public/img_for_icon/chip.svg';
import candyChief from '@/public/img_for_icon/candychief_btn.svg';
import hamburger from '@/public/img_for_icon/hamburger.svg';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import Image from 'next/image';
import styles from '@/styles/buyforme/speed-dial.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


const actions = [
    {
        icon:
            <div>
                <Image src={bubbleTea} width={35} alt='美食論壇' />
                <div className={styles.iconText}>美食論壇</div>
            </div>,
        name: '美食論壇',
        router: '/forum',
    },
    {
        icon:
            <div>
                <Image src={chip} width={55} alt='美食商城' style={{ marginTop: '5px',marginLeft: '5px' }} />
                <div className={styles.iconText}>美食商城</div>
            </div>,
        name: '美食商城',
        router: '/shopmall',
    },
    {
        icon:
            <div>
                <Image src={candyChief} width={45} alt='訂位/外帶' style={{ marginTop: '-5px',marginLeft: '-5px' }} />
                <div className={styles.iconText}>訂位/外帶</div>
            </div>,
        name: '訂位/外帶',
        router: '/reservation',
    },
    {
        icon:
            <div>
                <Image src={chocoCookie} width={55} alt='首頁' style={{ marginTop: '10px' }} />
                <div className={styles.iconText} >首頁</div>
            </div>,
        name: '首頁',
        router: '/',
    },
];

export default function OpenIconSpeedDial() {

    const router = useRouter();

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="Pagenation"
                sx={{
                    position: 'absolute',
                    bottom: 50,
                    left: 50,
                    '& .MuiFab-primary': {
                        width: 100,
                        height: 100,
                    },
                    '& .MuiFab-root.MuiSpeedDial-fab': {
                        backgroundColor: 'var(--main-color)'
                    }

                }}
                icon={
                    <div>
                        <Image src={hamburger} width={60} alt='順路買買' priority/>
                        <div className={styles.mainIconText} >順路買買</div>
                    </div>
                }
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        //tooltipTitle={action.name}
                        sx={{
                            height: 100,
                            width: 100,
                            //backgroundColor: 'var(--sub-color)'
                        }}
                        onClick={() => { router.push(action.router) }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}