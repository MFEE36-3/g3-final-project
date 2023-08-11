import { useState, useEffect, useContext } from 'react';
import MemBtn from './mem-Btn';
import Image from 'next/image';
import styles from './MemBookingDetail.module.css';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function MemBookingDetail({ openDetail, data, setShowDetail }) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const router = useRouter();

  const finishBooking = (id) => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/finishBooking', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      })
        .then((res) => res.json())
        .then(
          Swal.fire({
            title: '完成評價',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false,
          })
        )
        .then(setShowDetail(false))
        .then(router.push('/member'));
    }
  };

  const changeStar1 = () => {
    setStar1(true);
    if (star2 === true) setStar2(!star2);
    if (star3 === true) setStar3(!star3);
    if (star4 === true) setStar4(!star4);
    if (star5 === true) setStar5(!star5);
  };

  const changeStar2 = () => {
    setStar2(true);
    if (star1 === false) setStar1(!star1);
    if (star3 === true) setStar3(!star3);
    if (star4 === true) setStar4(!star4);
    if (star5 === true) setStar5(!star5);
  };

  const changeStar3 = () => {
    setStar3(true);
    if (star1 === false) setStar1(!star1);
    if (star2 === false) setStar2(!star2);
    if (star4 === true) setStar4(!star4);
    if (star5 === true) setStar5(!star5);
  };

  const changeStar4 = () => {
    setStar4(true);
    if (star1 === false) setStar1(!star1);
    if (star2 === false) setStar2(!star2);
    if (star3 === false) setStar3(!star3);
    if (star5 === true) setStar5(!star5);
  };

  const changeStar5 = () => {
    setStar5(true);
    if (star1 === false) setStar1(!star1);
    if (star2 === false) setStar2(!star2);
    if (star3 === false) setStar3(!star3);
    if (star4 === false) setStar4(!star4);
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.img}>
            <Image
              src={'http://localhost:3002/img/shops/' + data.photo}
              width={250}
              height={250}
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div>{'餐廳 : ' + data.shop}</div>
          <div>{'地址 : ' + data.location}</div>
          <div>
            <div>
              時間 :{' '}
              {data.booking_date.substring(0, 10) +
                '\u00A0\u00A0\u00A0' +
                data.booking_time.substring(0, 10)}
            </div>
          </div>
          <div>{'人數 : ' + data.booking_number}人</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{'評價 : '} </div>
            <div>
              {star1 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar1}
                  className={styles.star}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar1}
                  className={styles.star}
                />
              )}
            </div>
            <div>
              {star2 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar2}
                  className={styles.star}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar2}
                  className={styles.star}
                />
              )}
            </div>
            <div>
              {star3 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar3}
                  className={styles.star}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar3}
                  className={styles.star}
                />
              )}
            </div>
            <div>
              {star4 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar4}
                  className={styles.star}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar4}
                  className={styles.star}
                />
              )}
            </div>
            <div>
              {star5 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar5}
                  className={styles.star}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar5}
                  className={styles.star}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main2}>
        <MemBtn onClick={openDetail} text={'取消'} padding={'3px 5px'}></MemBtn>
        <MemBtn
          text={'完成'}
          padding={'3px 5px'}
          onClick={() => finishBooking(data?.booking_id)}
          className={styles.btn2}
        ></MemBtn>
      </div>
    </div>
  );
}
