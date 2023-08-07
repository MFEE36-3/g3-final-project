
import Card from 'react-bootstrap/Card';
import Crown from '@/public/reservation/crown.svg';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';

export default function Top5() {

  const [data, setData] = useState([]);
  const [position, setPosition] = useState(-810);


  useEffect(() => {
    fetch(`${process.env.API_SERVER}/reservation/top5`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setData(data.rows);
      })
  }, [])

  const moveleft = () => {
    setPosition(prevPosition =>
      prevPosition === 0 ? 0 : prevPosition + 270
    )
  }

  const moveright = () => {
    setPosition(prevPosition =>
      prevPosition === -1620 ? -1620 : prevPosition - 270
    )
  }


  return (
    <>
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex justify-content-center mb-3 pb-1`}>
        熱門排行
      </div>

      <div className={style.top5div}>
        <BsFillArrowLeftCircleFill className={style.top5button} onClick={moveleft} />

        <div className={style.top5row}>
          {data.map((v) => {
            const { sid, removeBackgroundImage, shop, rating } = v;
            return (
              <Card
                key={sid}
                className={`${style.top5card} h-25 position-relative`}
                style={{ transform: `translateX(${position}px)` }}
              >
                <Image src={Crown} className={style.top5crown} alt="" />
                <Card.Img src={`${process.env.API_SERVER}/img/res-img/${removeBackgroundImage}`} className='position-relative pt-5' alt="" />
                <Card.Body className={style.top5cardbody}>
                  <div className={style.top5star}>
                    <div className={style.me5}>{rating}</div>
                    <AiFillStar />
                  </div>
                  <Card.Title className={style.top5name}>{shop}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </div>

        <BsFillArrowRightCircleFill className={style.top5button} onClick={moveright} />
      </div>
    </>
  );
}
