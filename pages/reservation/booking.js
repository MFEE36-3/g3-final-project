import { useState } from 'react'
import style from '@/styles/reservation/style.module.css';
import Rcarousel from '@/components/reservation/reservationPage/carousel'
import Info from '@/components/reservation/reservationPage/info';
import ReservationPage from '@/components/reservation/reservationPage';
import ShoppingCart from '@/components/reservation/reservationPage/shoppingcart';
import Image from 'next/image';
import ShoppingBag from '@/public/reservation/shoppingbag.svg'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';



export default function Booking() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={style.body}>
        <Rcarousel />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Info />
            </div>

            <div className="col-9">
              <div>
                <Image src={ShoppingBag} variant="primary" onClick={handleShow}/>

                <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>--您的購物車--</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                   <ShoppingCart/>
                  </Offcanvas.Body>
                </Offcanvas>


              </div>
              <ReservationPage />
            </div>


          </div>
        </div>

      </div>
    </>
  );
}
