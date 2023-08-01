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

export default function ResultContent(favorite, setFavorite) {

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
      // console.log(`${process.env.API_SERVER}/search?${decodeURI(usp.toString()).replaceAll('%2C', ',')}`)

      fetch(`${process.env.API_SERVER}/reservation/restaurant` + window.location.search)
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          setData(data);
        })
    }
  }, [router.query])

  const handleFavorite = () => {
    setFavorite((prev) => {
      return !prev;
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

      <div className={style.main}>
        <div className={style.maincontent}>
          {data.rows.map((v) => {
            const { sid, picture, shop, res_cate, rating, location } = v;
            return (
              <Card
                className={`${style.card}`}
                key={sid}
              >
                <div className={style.carddiv}>
                  <Link href={"/reservation/" + sid}>
                    <Card.Img
                      variant="top"
                      src="../../reservation/respic.jpeg"
                      className={`${style.cardimg}`}
                    />
                    <div className={style.cardtext}>進入餐廳</div>
                  </Link>
                </div>
                <Card.Body>
                  <Card.Title>{shop}</Card.Title>
                  <Card.Text>{location}</Card.Text>


                  <div className="d-flex align-item-center justify-content-between">

                    <div className='d-flex'>
                      <div
                        style={{
                          fontSize: '14px',
                          background: '#911010',
                          borderRadius: 20,
                          border: 0,
                          color: 'white',
                          padding: '5px',
                        }}
                      >
                        <FaUtensils className={style.buttonicon} />
                        {res_cate}
                      </div>
                      <div className="d-flex align-item-center ms-1">
                        <AiFillStar
                          className="fs-4 h-100 text-warning"
                        // style={{ color: '#ecbd18' }}
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
