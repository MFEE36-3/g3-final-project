import { useState, useEffect, useContext } from 'react';
import MemBtn from './mem-Btn';
import Image from 'next/image';
import styles from './MemBookingDetail.module.css';

export default function MemBookingDetail({ openDetail, data }) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

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
          <div style={{ display: 'flex' }}>
            <div>{'評價 : '} </div>
            <div>
              {star1 ? (
                <Image
                  src={'http://localhost:3002/img/member/star02.png'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar1}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar1}
                  style={{ cursor: 'pointer' }}
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
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar2}
                  style={{ cursor: 'pointer' }}
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
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar3}
                  style={{ cursor: 'pointer' }}
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
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar4}
                  style={{ cursor: 'pointer' }}
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
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <Image
                  src={'http://localhost:3002/img/member/star01.svg'}
                  width={30}
                  height={30}
                  alt=""
                  onClick={changeStar5}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main2}>
        <MemBtn onClick={openDetail} text={'取消'} padding={'3px 5px'}></MemBtn>
        <MemBtn text={'完成訂單'} padding={'3px 15px'}></MemBtn>
      </div>
    </div>
  );
}
