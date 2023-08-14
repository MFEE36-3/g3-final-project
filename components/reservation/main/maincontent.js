import Card from 'react-bootstrap/Card';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import Link from "next/link";
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';

export default function MainContent({ favorite, setFavorite }) {

  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/reservation/cards`)
      .then(r => r.json())
      .then(data => {
        // console.log(data)
        setData(data.rows);
      })

    const member = JSON.parse(localStorage.getItem('auth'));
    if (member?.sid) {
      fetch(`${process.env.API_SERVER}/reservation/favoritelist/${member?.sid}`)
        .then(r => r.json())
        .then(data => {
          console.log(data)
        })
    }

  }, [])

  const handleFavorite = (sid) => {

    const member = JSON.parse(localStorage.getItem('auth'));

    //判斷是否登入
    if (!member?.sid) {
      Swal.fire({
        title: '請先登入',
        iconHtml: `<img src=${chocoCookie.src}>`,
        customClass: {
          icon: 'sweetalert_icon'
        },
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '前往登入',
        denyButtonText: '我再想想',
      }).then(
        function (result) {
          if (result.value) router.push('/login')
        });
      return;
    }

    // 判斷是否已收藏
    if (favorite.includes(sid)) {
      // 後端-刪除商品
      fetch(`${process.env.API_SERVER}/reservation/favorite_delete/${member?.sid}/${sid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: member.sid,
          shop_id: sid,
        })
      })

      // setFavorite
      fetch(`${process.env.API_SERVER}/reservation/favoritelist/${member?.sid}`)
        .then(r => r.json())
        .then(data => {
          // console.log(data)

          const newFav = data.rows.map(v => v.shop_id);
          setFavorite(prev => newFav)
        })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: '餐廳收藏已移除'
      })
      return;
    }

    // 後端-新增商品
    fetch(`${process.env.API_SERVER}/reservation/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: member.sid,
        shop_id: sid,
      })
    })
    // setFavorite
    fetch(`${process.env.API_SERVER}/reservation/favoritelist/${member?.sid}`)
      .then(r => r.json())
      .then(data => {
        // console.log(data)

        const newFav = data.rows.map(v => v.shop_id);
        setFavorite(prev => newFav)
      })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: '餐廳已收藏成功'
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
                <Card.Body className={style.cardbody}>
                  <Card.Title className={style.cardtitle}>{shop}</Card.Title>
                  <Card.Text className={style.cardlocation}>{location}</Card.Text>
                  <div className="d-flex align-item-center justify-content-between">
                    <div className='d-flex'>
                      <div className={style.cardbottomicon} >
                        <FaUtensils className={style.buttonicon} />
                        {res_cate}
                      </div>
                      <div className="d-flex align-item-center ms-1">
                        <AiFillStar
                          className="fs-4 h-100 text-warning"
                        />
                        <div className="d-flex align-item-center fs-5 fw-bold ms-1">
                          {rating}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-item-center" onClick={() => handleFavorite(sid)}>
                      {favorite.includes(sid) ?
                        <FaHeart className={`${style.cardheart} h-100`} /> :
                        <FaRegHeart className={`${style.cardheart} h-100`} />
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
