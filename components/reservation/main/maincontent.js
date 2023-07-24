import Card from 'react-bootstrap/Card';
// import cards from '@/data/reservation/cards.json';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';

export default function MainContent({ favorite, setFavorite }) {

  const [data, setData] = useState([]);

  // const trans = () => {
  //   data.map((v) => {
  //     if (v.category == 1) {
  //       setData ({ ...v, category: '中式' })
  //     }
  //   })
  // }

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurants/cards`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setData(data.rows);
        // trans();
      })
  }, [])

  // useEffect(()=>{
  //   trans()
  // },[data])



  // const handleFavorite = () => {
  //   setFavorite((prev) => {
  //     return !prev;
  //   })
  // }


  return (
    <>
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex w-100 justify-content-center mb-3 pb-1`}>
        查詢結果
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
