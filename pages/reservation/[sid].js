import { useState } from 'react'
import style from '@/styles/reservation/style.module.css';
import Rcarousel from '@/components/reservation/restaurantpage/carousel'
import Info from '@/components/reservation/restaurantpage/info';
import ReservationPage from '@/components/reservation/restaurantpage';
import ShoppingCart from '@/components/reservation/restaurantpage/shoppingcart';
import Image from 'next/image';
import dayjs from 'dayjs';
import ShoppingBag from '@/public/reservation/shoppingbag.svg'
import Offcanvas from 'react-bootstrap/Offcanvas';



export default function RestaurantPage() {

    const [show, setShow] = useState(false);

    // const today = new Date();
    // const startDate = dayjs(today).add(1, 'day').toDate();
    const [date, setDate] = useState(); //dayjs(startDate)
    const [time, setTime] = useState('');
    const [person, setPerson] = useState('');
    const [seat, setSeat] = useState('');

    //購物車Offcanvas
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={style.body}>
                <Rcarousel />
                <div className="container">
                    <div className="row">
                        <div className={style.infodiv}>
                            <Info />
                        </div>

                        <div className={style.reservationdiv}>
                            <div>
                                <Image src={ShoppingBag} variant="primary" onClick={handleShow} />

                                <Offcanvas show={show} onHide={handleClose} placement={'end'} className={style.cartbody}>
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className={style.carttitle}>--您的購物車--</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <ShoppingCart />
                                    </Offcanvas.Body>
                                </Offcanvas>


                            </div>
                            <ReservationPage date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} />
                        </div>


                    </div>
                </div>

            </div>
        </>
    );
}
