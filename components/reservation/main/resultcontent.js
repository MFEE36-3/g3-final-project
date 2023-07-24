import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { ContactSupportOutlined } from '@mui/icons-material';

export default function ResultContent(favorite, setFavorite) {

  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (router.query) {
      const usp = new URLSearchParams(router.query)
      console.log(`${process.env.API_SERVER}/search?${decodeURI(usp.toString()).replaceAll('%2C', ',')}`)

      fetch(`${process.env.API_SERVER}/search?${decodeURI(usp.toString()).replaceAll('%2C', ',')}`)
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          setData(data.rows);
        })
    }
  }, [router.query])

  // const handleFavorite = () => {
  //   setFavorite((prev) => {
  //     return !prev;
  //   })
  // }

  return (
    <>
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex w-100 justify-content-center mb-3 pb-1`}>
        推薦必吃
      </div>
      <div className={style.main}>
        <div className={style.maincontent}>
          {data.map((v) => {
            const { sid, picture, shop, category, location } = v;
            return (
              <Card
                className={`${style.card}`}
                key={sid}
              >
                <div className={style.carddiv}>
                  <Card.Img
                    variant="top"
                    src="../../reservation/respic.jpeg"
                    className={`${style.cardimg}`}
                  />
                  <div className={style.cardtext}>進入餐廳</div>
                </div>
                <Card.Body>
                  <Card.Title>{shop}</Card.Title>
                  <Card.Text>{location}</Card.Text>
                  <div className="d-flex align-item-center justify-content-between">
                    <div
                      style={{
                        fontSize: '12px',
                        background: '#911010',
                        borderRadius: 20,
                        border: 0,
                        color: 'white',
                        padding: '5px',
                      }}
                    >
                      <FaUtensils className="me-1" />
                      {category}
                    </div>
                    <div className="d-flex align-item-center">
                      <AiFillStar
                        className="fs-4 h-100 text-warning"
                      // style={{ color: '#ecbd18' }}
                      />
                      <div className="d-flex align-item-center">
                        4.5 / 5
                      </div>
                    </div>
                    <div className="d-flex align-item-center">
                      {favorite ?
                        <FaHeart className={`${style.cardheart} fs-4 h-100`} /> :
                        <FaRegHeart className={`${style.cardheart} fs-4 h-100`} />
                      }
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
