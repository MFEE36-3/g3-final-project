import { useState, useEffect, useContext } from 'react';
import MemBtn from './mem-Btn';
import Image from 'next/image';
import styles from './MemOrderDetail.module.css';
import { v4 } from 'uuid';

export default function MemOrderDetail({ openDetail, data }) {
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
    <div style={{ width: '100%' }}>
      <div className={styles.main}>
        {data?.map((v) => {
          return (
            <div key={v4()} className={styles.main3}>
              <div className={styles.img}>
                <Image
                  src={'http://localhost:3002/img/res-img/' + v.food_img}
                  width={70}
                  height={70}
                  alt=""
                />
              </div>

              <div className={styles.little}>{v.order_item}</div>
              <div>{'x' + v.order_num}</div>
              <div>{v.price}元</div>
            </div>
          );
        })}
      </div>
      <div>
        <div className={styles.starArea}>
          <div style={{ position: 'relative', top: '3px', left: '-5px' }}>
            評價 :{' '}
          </div>
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
        <div className={styles.main2}>
          <MemBtn
            onClick={openDetail}
            text={'取消'}
            padding={'3px 5px'}
          ></MemBtn>
          <MemBtn text={'完成訂單'} padding={'3px 15px'}></MemBtn>
        </div>
      </div>
    </div>
  );
}
