// import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';
import Link from "next/link";
import Select from '@mui/material/Select';
import { Router, useRouter } from 'next/router';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import Image from 'next/image';
import filled_walkbag_middle from '@/public/main_page/filled_walkbag_middle.svg';

export default function ResultContent({ favorite, setFavorite }) {

  const router = useRouter();
  const [sortrating, setSortrating] = useState('');

  const theme = createTheme({
    palette: {
      primary: {
        main: '#911010',
        darker: '#053e85',
      },
    },
  });

  const [data, setData] = useState({
    redirect: "",
    totalRows: 0,
    perPage: 4,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  useEffect(() => {
    if (router.query) {
      const usp = new URLSearchParams(router.query)

      fetch(`${process.env.API_SERVER}/reservation/restaurant` + window.location.search)
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          setData(data);
        })
    }
  }, [router.query])

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
        timer: 1000,
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

    // 使用fetch將資料送至後端處理
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
      timer: 1000,
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


  const [currentPage, setCurrentPage] = useState();

  // 處理pagination
  const handlePageChange = (e, page) => {
    setCurrentPage(page);

    let query = { ...router.query };
    // const query1 = query.replaceAll('%2C', ',');

    if (page) {
      query.page = page;
    }

    router.push({
      pathname: router.pathname,
      query: query
    }, undefined, { scroll: false })
  }

  // 處理sortrating
  const handleSort = (e) => {
    const sortrating = e.target.value;
    setSortrating(sortrating);

    let query = { ...router.query };

    if (sortrating) {
      query.sortrating = sortrating;
    }

    router.push({
      pathname: router.pathname,
      query: query
    }, undefined, { scroll: false })
  }

  return (
    <>
      <div className={`${style.fonttitle} ${style.borderbottom} d-flex w-100 justify-content-center mb-3 pb-1`}>
        符合餐廳
      </div>

      {data.rows.length > 0 ?
        <>
          {/* 分頁&排序 功能 */}
          <div className={style.paginationbar}>
            <div>
              <Pagination
                count={data.totalPages}
                onChange={handlePageChange}
              />
            </div>
            <div className={style.sortdiv}>
              <ThemeProvider theme={theme}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">--評分排序--</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sortrating}
                      label="city"
                      onChange={handleSort}
                      color="primary"
                    >
                      <MenuItem value={'desc'}>高到低</MenuItem>
                      <MenuItem value={'asc'}>低到高</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ThemeProvider>
            </div>
          </div>

          {/* 查詢結果餐廳 */}
          <div className={style.main}>
            <div className={style.maincontent}>
              {data.rows.map((v) => {
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
                          <div className={style.cardbottomicon}>
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
        :
        <div className={style.noitemdiv}>
          <Image src={filled_walkbag_middle} className={style.noitemimg} alt='filled_walkbag_middle' />
          <p className={style.noitemtext}>沒有符合的餐廳！</p>
        </div>

      }
    </>
  );
}
