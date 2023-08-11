import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import axios from 'axios';
import styles from '@/components/res/item/item-management.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import { ImBoxRemove } from 'react-icons/im';
import { TableContainer } from '@mui/material';
import ResAuthContext from '@/context/ResAuthContext';
import { headers } from 'next/dist/client/components/headers';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Stack from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import muistyles from '@/components/res/item/add-item.module.css';
import Head from 'next/head'

export default function Management() {
  const router = useRouter();
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext);

  // 拿到物件資料
  const [foodItem, setFoodItem] = useState({
    redirect: "",
    totalRows: 0,
    perPage: 4,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  const [originalFoodItem, setOriginalFoodItem] = useState([]); // 給filter用的array

  const getFoodItems = async () => {
    // const res = await axios.get(`http://localhost:3003/res/item-management`);
    fetch(`http://localhost:3002/res/item-management`, {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setFoodItem(data);
        // setOriginalFoodItem(data);
      });
    fetch(`http://localhost:3002/res/get-all-item-management`, {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        // setFoodItem(data);
        setOriginalFoodItem(data);
      });
  };

  // imgLink
  const imgLink = 'http://localhost:3002/img/res-img/';

  // 拿context裡面的資料
  // console.log(resAuth.account)
  // console.log(resAuth)
  const [takeContextInfo, setTakeContextInfo] = useState({});
  const takeInfo = () => {
    setTakeContextInfo(resAuth);
  };

  useEffect(() => {
    if (resAuth.account) {
      takeInfo();
      getFoodItems();
      // changeNumToString()
      console.log(takeContextInfo);
      console.log(resAuth);
    }
  }, [resAuth]);

  // 現在開始做selectBox
  const [foodCate, setFoodCate] = useState(6);
  const foodCateOptions = ['全部商品', '開胃菜', '主餐', '甜點', '飲料', '湯品'];

  const matchList = (e) => {
    if (e.target.value === '開胃菜') {
      setFoodCate('開胃菜');
    }
    if (e.target.value === '主餐') {
      setFoodCate('主餐');
    }
    if (e.target.value === '甜點') {
      setFoodCate('甜點');
    }
    if (e.target.value === '飲料') {
      setFoodCate('飲料');
    }
    if (e.target.value === '湯品') {
      setFoodCate('湯品');
    }
    if (e.target.value === '全部商品') {
      setFoodCate(6);
    }
    // setFoodCateString(e.target.value);
  };


  console.log(originalFoodItem)
  const foodCateFilter = () => {
    if (foodCate == 6) {
      router.push('/res/item-management');
      // setFoodItem(originalFoodItem);
      getFoodItems()
    } else {
      console.log(originalFoodItem)
      const newArray = originalFoodItem.rows.filter((v) => v.food_cate === foodCate);
      console.log(newArray)
      // setFoodItem(newArray);
      setFoodItem({ ...originalFoodItem, rows: newArray })
      console.log(foodItem)
    }
  };

  useEffect(() => {
    foodCateFilter();
  }, [foodCate]);

  // 商品排序
  const [itemOrder, setItemOrder] = useState('');
  const orderOption = ['由新到舊', '由舊到新'];

  // 由新到舊
  const newToOld = async (e) => {
    // const res = await axios.get('http://localhost:3003/res/item-management/DESC');

    fetch(`http://localhost:3002/res/item-management/DESC`, {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        setFoodItem(data);
        setOriginalFoodItem(data);
      });
  };
  // 由舊到新
  const OldToNew = async (e) => {
    fetch(`http://localhost:3002/res/item-management/ASC`, {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        setFoodItem(data);
        setOriginalFoodItem(data);
      });
  };

  // 關鍵字搜尋
  const [searchKeyword, setSearchKeyword] = useState('');
  const search = (e) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword);
  };

  const getSearchQuery = async (e) => {
    if (searchKeyword && resAuth.id) {
      router.push(`?keyword=${searchKeyword}&shop_id=${resAuth.id}`);
    } else {
      setFoodItem(originalFoodItem);
      router.push('/res/item-management');
    }
    console.log(router);
  };
  console.log(router)
  // 拿到router.query後fetch到後端去
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const usp = new URLSearchParams(router.query); // {keyword:abc}
      console.log(usp)
      console.log(usp.toString())
      fetch(`http://localhost:3002/res/item-management?${usp.toString()}`, {
        method: 'GET',
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setFoodItem(data);
        });
    }
  }, [router.query]);

  useEffect(() => {
    if (itemOrder) {
      if (itemOrder == '由新到舊') {
        newToOld();
      } else if (itemOrder == '由舊到新') {
        OldToNew();
      }
    }
  }, [itemOrder]);


  // 刪除商品
  const confirmDeleteItem = () => {
    Swal.fire({
      title: '您確定要刪除此項商品嗎?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '確定刪除',
      denyButtonText: `取消刪除`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('刪除成功!', '', 'success');
        router.push(`/res/item-management/delete-item/${v.food_id}`);
      } else if (result.isDenied) {
        Swal.fire('取消刪除', '', 'info');
      }
    });
  };
  // 分頁功能
  const [item, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // page 功能
  // const connect = async (page) => {
  //   fetch(`http://localhost:3002/news/demo?page=${page}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setItems(data.rows);
  //       setTotalPages(data.totalPages);
  //       setCurrentPage(page);
  //     });
  // };

  // const connect = async (page) => {
  //   fetch(`http://localhost:3002/res/item-management?page=${page}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data)
  //       setItems(data.rows);
  //       setTotalPages(data.totalPages);
  //       setCurrentPage(page);
  //     });
  // };

  // useEffect(() => {
  //   connect(1);
  // }, []);

  const handlePageChange = (event, page) => {
    // connect(page);
    // setCurrentPage(page)
    const query = { ...router.query, shop_id: resAuth.id }
    if (page) {
      query.page = page
      router.push({
        pathname: router.pathname,
        query: query
      }), undefined, { scroll: true }
    }
  };

  console.log(foodItem)

  // css樣式
  const rowStyle = {
    height: '90px',
  };
  const ceilStyle = {
    minWidth: 80,
    color: '#921010',
    fontFamily: 'var(--ff1)',
    fontSize: '20px',
  };

  const tdStyle = {
    fontSize: '18px',
    fontWeight: '600',
    height: '70px',
    fontFamily: 'var(--ff1)',
  };

  const desc = {
    fontSize: '18px',
    fontWeight: '600',
    height: '70px',
    fontFamily: 'var(--ff1)',
    width: '300px'
  }

  const showFoodItems = () => {

    return (
      <>
        <Head>
          <title>食GOEAT! / 商家中心</title>
        </Head>
        <TableBody>
          {foodItem.rows && foodItem.rows.length > 0 ? foodItem.rows.map((v, i) => (

            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={tdStyle}>
                <img
                  src={`${imgLink}${v.food_img}`}
                  className={`${styles.imgSize}`}
                ></img>
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                {v.food_title}
              </TableCell>
              <TableCell align="center" sx={desc}>
                {v.food_des}
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                {v.food_price}
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                {String(v.create_time).split(" ")[0]}
              </TableCell>
              <TableCell align="center" sx={tdStyle}>
                <Link
                  href={`/res/item-management/edit-item/${v.food_id}`}
                >
                  <button
                    type="button"
                    className={`me-3 btn btn-primary ${muistyles.btnright}`}
                    onClick={(e) => {
                      router.push(
                        `/res/item-management/edit-item/${v.food_id}`
                      );
                    }}
                  >
                    <AiTwotoneEdit />
                  </button>
                </Link>
              </TableCell>
              {/* <TableCell align="center" sx={tdStyle}>
                <button
                  type="button"
                  className={`me-3 btn btn-primary ${muistyles.btnright}`}
                  onClick={(e) => { }}
                >
                  <ImBoxRemove />
                </button>
              </TableCell> */}
              <TableCell align="center" sx={tdStyle}>
                <button
                  type="button"
                  className={`me-3 btn ${muistyles.btnright}`}
                  onClick={() => {
                    Swal.fire({
                      title: '您確定要刪除此項商品嗎?',
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: '確定刪除',
                      denyButtonText: `取消刪除`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire('刪除成功!', '', 'success');
                        fetch(
                          `http://localhost:3002/res/item-management/deleteItem/${v.food_id}`,
                          { method: 'DELETE' }
                        )
                          .then((r) => r.json())
                          .then((data) => {
                            console.log(data);
                            location.reload();
                          });
                        // router.push(`/res/item-management/delete-item/${v.food_id}`)
                      } else if (result.isDenied) {
                        Swal.fire('取消刪除', '', 'info');
                      }
                    });
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              </TableCell>
            </TableRow>
          )) : ''}
        </TableBody></>)
  }

  return (
    <>
      <div
        className={`container-xxl-fluid container container-sm-fluid d-flex flex-column ${styles.formbgc} p-3 col-10 border border-2 rounded-4 border-black mt-4`}
      >
        <div className="row">
          <div className="col-xxl-12 col-sm-12">
            <div className="d-flex justify-content-between mt-3">
              <div className="">
                <div className="d-flex justify-content-start align-items-center">
                  <Link href={`/res/add-item`}>
                    <button className={`${styles.addbtn} ms-3 `}>新增商品</button>
                  </Link>

                  {resAuth.account ? (
                    <>
                      <label className="ms-3 fw-bold fs-3">
                        歡迎回來，{resAuth.shop}
                      </label>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                <div className='d-flex justify-content-between'>
                  <div className="d-flex justify-content-between">
                    <select
                      className="form-select mt-3 ms-3"
                      value={itemOrder}
                      onChange={(e) => {
                        setItemOrder(e.target.value);
                      }}
                    >
                      <option value="">請選擇商品排序:</option>
                      {orderOption.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      value={foodCate}
                      onChange={matchList}
                      className="form-select mt-3 ms-3"
                    >
                      <option value="">---請選擇分類---</option>
                      {foodCateOptions.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                    <div className="w-100 d-flex justify-content-center mt-3">

                      <Pagination
                        count={foodItem.totalPages}
                        // page={currentPage}
                        className={styles.page}
                        onChange={handlePageChange}
                        sx={{
                          '& .MuiPaginationItem-root': {
                            fontSize: 20,
                          },
                          '& .Mui-selected': {
                            fontSize: 25,
                          },
                          '& .MuiPaginationItem-page': {
                            minWidth: '40px',
                            padding: '7px',
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.input}>
                    <Input
                      label="搜尋商品"
                      placeholder="請輸入搜尋文字"
                      name="keyword"
                      value={searchKeyword}
                      onChange={search}
                    />

                    <button
                      type="button"
                      className={styles.search}
                      onClick={getSearchQuery}
                    >
                      搜尋
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={rowStyle}>
                      <TableCell align="center" sx={ceilStyle}>
                        商品圖片
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        商品名稱
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        商品敘述
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        價格
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        商品建立時間
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        編輯
                      </TableCell>
                      {/* <TableCell align="center" sx={ceilStyle}>
                        下架
                      </TableCell> */}
                      <TableCell align="center" sx={ceilStyle}>
                        刪除
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {showFoodItems()}
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
