import Card from 'react-bootstrap/Card';
// import cards from '@/data/reservation/cards.json';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import Link from "next/link";
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect, useContext } from 'react';
import { auth } from '@/pages/reservation/index'

export default function MainContent({ favorite, setFavorite }) {
  const { token } = useContext(auth)
  const [data, setData] = useState([]);
  // console.log(token);
  useEffect(() => {
    fetch(`${process.env.API_SERVER}/reservation/cards`)
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        setData(data.rows);
      })
  }, [])
  // const loginAlert = () => {
  //   Swal.fire({
  //     title: '請先登入會員',
  //     showClass: {
  //       popup: 'animate__animated animate__fadeInDown'
  //     },
  //     hideClass: {
  //       popup: 'animate__animated animate__fadeOutUp'
  //     },
  //     icon: 'warning',
  //     confirmButtonText: '前往登入',
  //     customClass: {
  //       confirmButton: 'bg-danger'
  //     }
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       window.location.href = 'http://localhost:3001/login'
  //     }
  //   })
  // }

  const handleFavorite = () => {
    // if (!token.token) loginAlert()
    // if (!token.token) return
    setFavorite((prev) => {
      return !prev;
    })
  }


  return (
    <>
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex w-100 justify-content-center mb-3 pb-1`}>
        推薦餐廳
      </div>
      <div className={style.main}>
        <div className={style.maincontent}>
          {data.map((v) => {
            const { sid, photo, shop, res_cate, rating, location } = v;
            return (
              <Card
                className={`${style.card}`}
                key={sid}
              >
                <div className={style.carddiv}>
                  <Link href={"/reservation/" + sid}>
                    <Card.Img
                      variant="top"
                      src={`${process.env.API_SERVER}/img/shops/${photo}`}
                      className={`${style.cardimg}`}
                    />
                    <div className={style.cardtext}>查看餐廳</div>
                  </Link>
                </div>
                <Card.Body>
                  <Card.Title className={style.cardtitle}>{shop}</Card.Title>
                  <Card.Text>{location}</Card.Text>
                  <div className="d-flex align-item-center justify-content-between">
                    <div className='d-flex'>
                      <div className={style.cardbottomicon}>
                        <FaUtensils className={style.buttonicon} />
                        {res_cate}
                      </div>
                      <div className="d-flex align-item-center ms-1">
                        <AiFillStar
                          className="fs-4 h-100 text-warning"
                        />
                        <div className="d-flex align-item-center fs-5">
                          {rating}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-item-center" onClick={handleFavorite}>
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
