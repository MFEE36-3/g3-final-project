import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import style from '@/styles/reservation/style.module.css';
import Rcarousel from '@/components/reservation/restaurantpage/carousel'
import Info from '@/components/reservation/restaurantpage/info';
import ReservationPage from '@/components/reservation/restaurantpage';
import ShoppingCart from '@/components/reservation/restaurantpage/shoppingcart';
import ShoppingBag from '@/public/reservation/shoppingbag.svg'
import Offcanvas from 'react-bootstrap/Offcanvas';



export default function RestaurantPage() {

    // const [show, setShow] = useState(false);

    // const nowdate = new Date();
    // const startDate = dayjs(today).add(1, 'day').toDate();
    const [date, setDate] = useState(); //dayjs(startDate)
    const [time, setTime] = useState('');
    const [person, setPerson] = useState('');
    const [seat, setSeat] = useState('');
    const [row, setRow] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (router.query.sid) {
            fetch(process.env.API_SERVER + "/search/" + router.query.sid)
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) {
                        setRow(data.row);
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
                            <ReservationPage row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} />
                        </div>


                    </div>
                </div>

            </div>
        </>
    );
}
