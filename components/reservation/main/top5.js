import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import cards2 from '@/data/reservation/cards2.json';
import Crown from '@/public/reservation/crown.svg';
import Image from 'next/image';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';

export default function Top5() {

  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0);


  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurants`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setData(data.rows);
      })
  }, [])

  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex justify-content-center mb-3 pb-1`}>
        熱門排行
      </div>

      <div className={style.top5div}>

        <button>aaa</button>
        <div className={style.top5row}>
          {data.map((v) => {
            const { sid, picture, shop } = v;
            return (
              <Card
                key={sid}
                className={`${style.top5card} h-25 position-relative`}
              >
                <Image src={Crown} className='position-absolute top-0 start-0 ' alt="" />
                <Card.Img src="../../reservation/c1.png" className='position-relative pt-5' alt="" />
                <Card.Body>
                  <Card.Title>{shop}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </div>
        <button>bbb</button>
      </div>
    </>
  );
}
