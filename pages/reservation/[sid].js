import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import style from '@/styles/reservation/style.module.css';
import Rcarousel from '@/components/reservation/restaurantpage/carousel'
import Info from '@/components/reservation/restaurantpage/info';
import ReservationPage from '@/components/reservation/restaurantpage';
import ShoppingCart from '@/components/reservation/restaurantpage/shoppingcart';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'next/image';
import ShoppingBag from '@/public/reservation/shoppingbag.svg'
import Badge from '@mui/material/Badge';
import Head from 'next/head';

export default function RestaurantPage() {

    const router = useRouter();
    const [date, setDate] = useState(); // 日期
    const [time, setTime] = useState(''); // 時間
    const [person, setPerson] = useState(''); //人數
    const [seat, setSeat] = useState(''); // 座位
    const [memo, setMemo] = useState('');
    const [row, setRow] = useState({ detail: {}, booking: [], seattype: [], fooditems: [] }); //{detail,booking,seattype}
    const [shoppingCart, setShoppingCart] = useState([]);
    const [togodate, setTogodate] = useState();
    const [togotime, setTogotime] = useState();
    const [shopcount, setShopCount] = useState(0);
    const [item, setItem] = useState({})
    const [show, setShow] = useState(false);
    // const localdatetime = JSON.parse(localStorage.getItem('order')) || {};

    //購物車Offcanvas
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {

        if (router.query.sid) {
            fetch(process.env.API_SERVER + "/reservation/" + router.query.sid)
                .then((r) => r.json())
                .then((data) => {
                    // console.log(data)
                    if (data.success) {
                        // setRow(data.row);
                        setRow({ detail: data.detail, booking: data.booking, seattype: data.seattype, fooditems: data.fooditems })
                        // console.log(data.booking)
                    } else {
                    }
                })
        };
    }, [router.query]);

    //第一次取得localStorage的品項數量
    useEffect(() => {
        if (!localStorage.getItem('order')) return;
        const items = JSON.parse(localStorage.getItem('order'))
        const count = Object.keys(items).length;
        // console.log(count)
        setShopCount(count);
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('order')) return;
        const items = JSON.parse(localStorage.getItem('order'))
        const count = Object.keys(items).length;
        // console.log(count)
        setShopCount(count);
    }, [item])

    return (
        <>
            <Head>
                <title>食GOEAT! / 訂位外帶</title>
            </Head>

            <div className={style.body}>
                <Rcarousel row={row} />
                <div className="container">
                    <div className="row">
                        <div className={style.infodiv}>
                            <Info row={row} />
                        </div>

                        <div className={style.reservationdiv}>
                            <ReservationPage row={row} date={date} setDate={setDate} time={time} setTime={setTime}
                                person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} memo={memo} setMemo={setMemo}
                                shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} togodate={togodate} setTogodate={setTogodate}
                                togotime={togotime} setTogotime={setTogotime} item={item} setItem={setItem}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.carticon}>
                    <Badge badgeContent={shopcount} color="primary">
                        <Image src={ShoppingBag} variant="primary" onClick={handleShow} />
                    </Badge>
                </div>
                <Offcanvas show={show} onHide={handleClose} placement={'end'} className={style.cartbody}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><div className={style.carttitle}>--您的購物車--</div></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ShoppingCart row={row} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}
                            togodate={togodate} setTogodate={setTogodate} togotime={togotime} setTogotime={setTogotime} shopcount={shopcount}
                            setShopCount={setShopCount}
                        />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

        </>
    );
}
