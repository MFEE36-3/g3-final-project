import Card from 'react-bootstrap/Card';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Router, useRouter } from 'next/router';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ResultContent(favorite, setFavorite) {

  const router = useRouter();

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

      fetch(`${process.env.API_SERVER}/search` + window.location.search)
        .then(r => r.json())
        .then(data => {
          // console.log(data)
          setData(data);
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
        符合餐廳
      </div>
      <div>
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array(5)
              .fill(1)
              .map((v, i) => {
                const p = data.page - 2 + i;
                const query = { ...router.query };
                if (p < 1 || p > data.totalPages) return;
                query.page = p;
                return (
                  <li
                    className={
                      `page-item ` + (p === data.page ? "active" : "")
                    }
                    key={p}
                  >
                    <Link className="page-link" href={"?" + new URLSearchParams(query).toString().replaceAll('%2C', ',')}>
                      {p}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
      <div>
        <Pagination
          count={data.totalPages} // 总页数，需要根据实际情况设置
        // page={currentPage}
        // onChange={handlePageChange}
        />
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
                  <Link href={"/search/" + sid}>
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
                      {res_cate}
                    </div>
                    <div className="d-flex align-item-center">
                      <AiFillStar
                        className="fs-4 h-100 text-warning"
                      // style={{ color: '#ecbd18' }}
                      />
                      <div className="d-flex align-item-center">
                        {rating}
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
