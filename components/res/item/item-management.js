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
export default function Management() {
  const router = useRouter();
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext);

  // 拿到物件資料
  const [foodItem, setFoodItem] = useState([]);
  const [originalFoodItem, setOriginalFoodItem] = useState([]); // 給filter用的array
  // 分頁功能
  const [item, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        setFoodItem(data.rows);
        setOriginalFoodItem(data.rows);
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

  // 現在才開始做selectBox
  const [foodCate, setFoodCate] = useState(6);
  const [foodCateString, setFoodCateString] = useState('');
  const foodCateOptions = ['全部商品', '前菜', '主菜', '甜點', '飲料', '湯品'];

  const matchList = (e) => {
    if (e.target.value == '前菜') {
      setFoodCate('前菜');
    }
    if (e.target.value == '主菜') {
      setFoodCate('主菜');
    }
    if (e.target.value == '甜點') {
      setFoodCate('甜點');
    }
    if (e.target.value == '飲料') {
      setFoodCate('飲料');
    }
    if (e.target.value == '湯品') {
      setFoodCate('湯品');
    }
    if (e.target.value == '全部商品') {
      setFoodCate(6);
    }
    setFoodCateString(e.target.value);
  };

  const foodCateFilter = () => {
    if (foodCate == 6) {
      router.push('/res/item-management');
      setFoodItem(originalFoodItem);
    } else {
      const newArray = originalFoodItem.filter((v) => v.food_cate == foodCate);
      setFoodItem(newArray);
    }
  };

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
        setFoodItem(data.rows);
        setOriginalFoodItem(data.rows);
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
        setFoodItem(data.rows);
        setOriginalFoodItem(data.rows);
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
    // router.push(`?keyword=${searchKeyword}&shop_id=${resAuth.id}`) // 連到query
    console.log(router);
  };
  // console.log(router)
  // 拿到router.query後fetch到後端去
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const usp = new URLSearchParams(router.query); // {keyword:abc}
      fetch(`http://localhost:3002/res/item-management?${usp.toString()}`, {
        method: 'GET',
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setFoodItem(data.rows);
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

  // useEffect(() => {
  //   foodCateFilter()

  // }, [foodItem, foodCate])

  useEffect(() => {
    foodCateFilter();
  }, [foodCate]);

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

  // useEffect(() => {
  //   connect(1);
  // }, []);

  // const handlePageChange = (event, newPage) => {
  //   connect(newPage);
  // };

  return (
    <>
      <h3 className="container">商品管理</h3>
      <div
        className={`container-xxl-fluid container container-sm-fluid d-flex flex-column ${styles.formbgc} p-3 col-10 border border-2 rounded-4 border-black`}
      >
        <div className="row">
          <div className="col-xxl-12 col-sm-12">
            <div className="d-flex justify-content-between mt-3">
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <Link href={`/res/add-item`}>
                    <button className={`${styles.addbtn} `}>新增商品</button>
                  </Link>

                  {resAuth.account ? (
                    <>
                      <label className="ms-3 fw-bold">
                        歡迎回來，{resAuth.shop}
                      </label>{' '}
                      <button
                        type="button"
                        className="ms-3 btn btn-primary"
                        onClick={logout}
                      >
                        登出
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
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
                    value={foodCateString}
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
                      count={totalPages}
                      page={currentPage}
                      // onChange={handlePageChange}
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

            <div className="">
              <table
                className={`table mt-3 table-borderless rounded-5 border-black table-warning table-striped ${styles.itemTable}`}
              >
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      商品圖片
                    </th>
                    <th scope="col" className="text-center">
                      商品名稱
                    </th>
                    <th scope="col" className="text-center">
                      商品敘述
                    </th>
                    <th scope="col" className="text-center">
                      價格
                    </th>
                    {/* <th scope="col" className="text-center">
                      分類
                    </th> */}
                    {/* <th scope="col" className="text-center">
                      商品備註
                    </th> */}
                    <th scope="col" className="text-center">
                      商品建立時間:
                    </th>
                    <th scope="col" className="text-center">
                      編輯
                    </th>
                    <th scope="col" className="text-center">
                      下架
                    </th>
                    <th scope="col" className="text-center">
                      刪除
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {foodItem.map((v, i) => {
                    return (
                      <tr className={``} style={{ background: 'gray' }} key={i}>
                        <td className={`text-center ${styles.imgSize}`}>
                          <img
                            src={`${imgLink}${v.food_img}`}
                            className={`${styles.imgSize}`}
                          ></img>
                        </td>
                        <td className={`text-center`}>{v.food_title}</td>
                        <td
                          className={`text-center`}
                          style={{
                            width: '100px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {v.food_des}
                        </td>
                        <td className="text-center">{v.food_price}</td>
                        {/* <td className="text-center">{v.foodCateToString}</td> */}
                        {/* <td className="text-center">{v.food_note}</td> */}
                        <td className={`text-center`}>{v.create_time}</td>

                        <td className={`text-center`}>
                          <Link
                            href={`/res/item-management/edit-item/${v.food_id}`}
                          >
                            <button
                              type="button"
                              className="me-3 btn btn-primary"
                              onClick={(e) => {
                                router.push(
                                  `/res/item-management/edit-item/${v.food_id}`
                                );
                              }}
                            >
                              <AiTwotoneEdit />
                            </button>
                          </Link>
                        </td>

                        <td className={`text-center`}>
                          {' '}
                          <button
                            type="button"
                            className="me-3 btn btn-primary"
                            onClick={(e) => {}}
                          >
                            <ImBoxRemove />
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="me-3 btn btn-primary"
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
