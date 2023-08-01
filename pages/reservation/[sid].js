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

export default function RestaurantPage() {

    const router = useRouter();
    const [date, setDate] = useState(); // 日期
    const [time, setTime] = useState(''); // 時間
    const [person, setPerson] = useState(''); //人數
    const [seat, setSeat] = useState(''); // 座位
    const [memo, setMemo] = useState('');
    const [row, setRow] = useState({ detail: {}, booking: [], seattype: [], fooditems: [] }); //{detail,booking,seattype}
    const [shoppingCart, setShoppingCart] = useState([]);

    const [show, setShow] = useState(false);

    //購物車Offcanvas
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    return (
        <>
            <div className={style.body}>
                <Rcarousel row={row} />
                <div className="container">
                    <div className="row">
                        <div className={style.infodiv}>
                            <Info row={row} />
                        </div>

                        <div className={style.reservationdiv}>
                            <ReservationPage row={row} date={date} setDate={setDate} time={time} setTime={setTime}
                                person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} memo={memo} setMemo={setMemo} />
                        </div>
                    </div>
                </div>
                <Image src={ShoppingBag} variant="primary" onClick={handleShow} className={style.carticon} />
                <Offcanvas show={show} onHide={handleClose} placement={'end'} className={style.cartbody}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className={style.carttitle}>--您的購物車--</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ShoppingCart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
}
