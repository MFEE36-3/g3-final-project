import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/order-management.js/order-management.module.css'
import ResAuthContext, { } from '@/context/ResAuthContext';
import Swal from 'sweetalert2'
import Pagination from '@mui/material/Pagination';
import muistyles from '@/components/res/item/add-item.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DateTime from '@/components/reservation/restaurantpage/reservation/datetime';
import Head from 'next/head'
const mui_style = {
  '&:hover fieldset': {
    backgroundColor: 'rgba(250,179,179,0.2)',
    borderColor: '#FAB3B3'
  },
  '& .MuiInputLabel-root': {
    fontSize: 'var(--h6)',
    fontWeight: 900,
    fontFamily: 'var(--ff1)'
  },
  '& .MuiSvgIcon-root': {
    color: 'var(--sub-color)'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--sub-color)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--sub-color)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--sub-color)',
    },
    fontSize: 'var(--h6)',
    fontWeight: 600,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--sub-color)'
  },
  '& label.Mui-focused,label': {
    color: 'var(--main-color)',
  },
  width: '100%',
}

export default function OrderManagement() {

  // SELECT `open_sid`, `target_store`, `open_time`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN `buy_for_me_detail` ON `open_for_you`.`open_sid` = `buy_for_me_detail`.`order_sid`;

  // 串三張:
  // SELECT `order_sid`, `open_sid`, `target_store`, `open_time`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN ( SELECT `buy_for_me`.`order_sid`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `buy_for_me` JOIN `buy_for_me_detail` ON `buy_for_me`.`order_sid` = `buy_for_me_detail`.`order_sid` ) AS `result1` ON `open_for_you`.`open_sid` = `result1`.`order_sid`;

  // 串四張(加了食物名稱):
  // SELECT `subA`.`open_sid`, `subA`.`order_sid`, `buy_for_me_detail`.`order_food`, `buy_for_me_detail`.`order_quantity`, `buy_for_me_detail`.`order_price`, `buy_for_me_detail`.`order_detail_sid`, `subA`.`target_store`, `subA`.`open_time`, `subA`.`order_instructions`, `food_items_try`.`food_title`, `food_items_try`.`food_id` FROM ( SELECT `open_for_you`.`open_sid`, `open_for_you`.`target_store`, `open_for_you`.`open_time`, `buy_for_me`.`order_sid`, `buy_for_me`.`order_instructions` FROM `open_for_you` JOIN `buy_for_me` ON `open_for_you`.`open_sid` = `buy_for_me`.`open_sid` ) AS `subA` JOIN `buy_for_me_detail` ON `buy_for_me_detail`.`order_sid` = `subA`.`order_sid` JOIN `food_items_try` ON `food_items_try`.`food_id` = `buy_for_me_detail`.`order_food` WHERE `target_store` = 1;
  console.log('------')

  // 訂單狀態
  const [orderState, setOrderState] = useState('')
  const [orderTimeState, setOrderTimeState] = useState([])
  const orderStateOptions = ['所有訂單', '未完成', '已完成，等待取餐', '已結單'];

  // 訂單順序
  const [orderTime, setOrderTime] = useState('')
  const orderTimeOptions = ['由新到舊', '由舊到新']

  // 訂單分類
  const [orderCategory, setOrderCategory] = useState('揪團')
  const orderCategoryOptions = ['揪團', '外帶']
  const setOriginalOrder = () => {
    if (orderCategory == '外帶') {
      setTogoOrder(originalTogoOrder)
    }
  }
  useEffect(() => {
    setOriginalOrder()
  }, [orderCategory])

  // 拿到resAuth資料
  const { resAuth, setResAuth, resLogout } = useContext(ResAuthContext)

  // 接後端response的資料
  const [getOrders, setGetOrders] = useState([])  // array
  const [getOrderAmount, setGetOrderAmount] = useState([])

  // 揪團有多少頁數
  const [totalShopPage, setTotalShopPage] = useState(0)
  // 揪團有多少訂單(寫訂單編號用)
  const [totalShopOrder, setTotalShopOrder] = useState(0)

  const getShopOrder = () => {
    fetch(`http://localhost:3002/res/getShopOrder`, {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        setGetOrders(data.data3); // 在這裡處理後端回應，設置 getOrders 的新值
        setOrderTimeState(data.data1)
        setGetOrderAmount(data.data2);
        setTotalShopOrder(data.data1.length)
        const totalPage = Math.ceil(data.data1.length / 10)
        setTotalShopPage(totalPage)
      })
      .catch(error => {
        console.error(error);
        // 在這裡處理錯誤情況
      });
  }
  useEffect(() => {
    if (getOrders) {
      console.log(getOrders)
    }
  }, [getOrders])

  console.log(totalShopOrder)
  console.log(totalShopPage)    // int

  // 拿到外帶訂單資料
  const [togoOrder, setTogoOrder] = useState([])
  // 拿到原始外帶訂單資料
  const [originalTogoOrder, setOriginalTogoOrder] = useState([])
  // 拿各筆訂單的品項
  const [togoItems, setTogoItems] = useState([])
  // 拿外帶的訂單數量
  const [orderAmount, setOrderAmount] = useState([])

  // 拿有多少分頁
  const [totalTogoPage, setTotalTogoPage] = useState(0)
  const getTogoOrder = async () => {
    fetch(process.env.API_SERVER + '/res/getTogoOrder', {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)   // array
        setTogoOrder(data.groupedOrderItems)
        setOriginalTogoOrder(data.groupedOrderItems)
        setOrderAmount(data.groupedOrderItems.length)
        setTotalTogoPage(data.totalPages)
      })
  }


  useEffect(() => {
    if (resAuth.account) {
      getShopOrder();
      getTogoOrder();
      console.log(getOrders); // 這裡會顯示空陣列 []，因為 getShopOrder() 還沒完成
    }
  }, [resAuth]);

  const amounts = [3, 5, 3, 2, 4, 3, 3, 4, 4, 1, 2, 6, 1, 3, 3, 1];
  const prices = [60, 40, 50, 60, 10, 20, 40, 70, 30, 30, 50, 50, 50, 80, 40, 30];

  // 將amounts和prices對應位置的元素相乘，然後將所有相乘後的數字相加
  const totalAmountPrice = amounts.reduce((total, amount, index) => {
    return total + amount * prices[index];
  }, 0);

  console.log(totalAmountPrice); // 1230

  // 訂單顯示更多或隱藏
  const [showOrder, setShowOrder] = useState(false)
  const changeShowOrder = () => {
    setShowOrder(!showOrder)
  }

  const [completeOrder, setCompleteOrder] = useState(false)
  const turnToComplete = (i) => {

    setCompleteOrder(true)
    const modifiedTogoOrder = [...togoOrder];
    console.log(modifiedTogoOrder)

    modifiedTogoOrder[i][0].status = '已完成，等待取餐';

    setTogoOrder(modifiedTogoOrder);

    Swal.fire(
      '已通知消費者取餐!',
      '等候消費者來取餐',
      'success'
    );
  }

  // 點擊通知完成後通知消費者訂單已完成，並將狀態改為等待消費者領取
  const informMember = (i) => {
    const modifiedTogoOrder = [...togoOrder];
    console.log(modifiedTogoOrder)

    modifiedTogoOrder[i][0].status = '已完成';

    setTogoOrder(modifiedTogoOrder);

    Swal.fire(
      '已通知消費者取餐!',
      '等候消費者來取餐',
      'success'
    );
  }

  // 設置切換呈現資料的狀態
  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    // 在這裡處理頁碼變化的邏輯
    console.log(`跳轉到頁碼：${value}`);
    setPage(value)
  };

  // 關鍵字搜尋
  const [getKeyword, setGetKeyword] = useState('')
  // 如果沒有搜到的話
  const [noKeyWordMessage, setNoKeyWordMessage] = useState('')

  const searchKeyword = () => {
    setNoKeyWordMessage('')
    if (getKeyword) {
      const searchResult = togoOrder.filter((v, i) => {
        const arr = v.filter((v2, i2) => v2.order_item.includes(getKeyword));
        if (arr.length !== 0) return v;
      })
      console.log(searchResult)
      if (searchResult.length = 0) {    // 沒有這筆訂單
        setNoKeyWordMessage('沒有這項訂單!')
        setTogoOrder(originalTogoOrder)
      } else { 

        setTogoOrder(searchResult) 
        console.log(togoOrder)
      }
    } else {
      setTogoOrder(originalTogoOrder)
    }

  }

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

  return (
    <>
      <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
      <div className={`container container-sm-fluid ${styles.tableBackGround} bg-subtle p-4 border border-black rounded-4 mt-3`}>
        <h2 className='fw-bold'>訂單管理</h2>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="justify-content-between me-3">
            <Btn text="所有訂單" className="me-3" />
            <div className='mt-3 ms-3 fw-bold fs-4'>歡迎回來，{resAuth.shop}</div>
            {orderCategory == '揪團' ?
              <Pagination
                count={totalShopPage}
                onChange={handleChange}
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
              :
              <Pagination
                count={totalTogoPage}
                // page={totalTogoPage}
                // onChange={handlePageChange}
                onChange={handleChange}
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
            }



            <div className='d-flex justify-content-between'>
              <select className="form-select mt-3" value={orderTime} onChange={(e) => {
                setOrderTime(e.target.value)
              }}>
                <option value='/'>---訂單順序---</option>
                {orderTimeOptions.map((v, i) => {
                  return <option key={i} value={v}>{v}</option>
                })}
              </select>

              <select className='form-select mt-3 ms-3' value={orderCategory} onChange={(e) => {
                setOrderCategory(e.target.value)
              }}>
                {/* <option value={``}>---訂單種類---</option> */}
                {orderCategoryOptions.map((v, i) => {
                  return <option key={i} value={v}>{v}</option>
                })}
              </select>

              <select className="form-select mt-3 ms-3" value={orderState} onChange={(e) => { setOrderState(e.target.value) }}>
                <option selected value={``}>---訂單狀態----</option>
                {orderStateOptions.map((v, i) => {
                  return <option key={i} value={v}>{v}</option>
                })}
              </select>
            </div>
          </div>

          <div>
            <div>
              <Input placeholder="請輸入搜尋關鍵字" label="請輸入搜尋關鍵字" onChange={(e) => {

                setGetKeyword(e.target.value)

                // console.log(togoOrder.filter((v, i) => {
                //   const arr = v.filter((v2, i2) => v2.order_item.includes(e.target.value));
                //   if (arr.length !== 0) return v;
                // }))
              }} />
              <button className={`${muistyles.btnright}`} onClick={searchKeyword}>搜尋</button>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          {orderCategory == '揪團' ?
            (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={rowStyle}>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單編號
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單狀態
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單內容
                        <button type='button' className={`btn btn-warning ms-auto mt-auto ${muistyles.btnright}`} style={{ visibility: 'visibile' }} onClick={changeShowOrder}>{showOrder == false ? '顯示更多' : '隱藏內容'}</button>
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        總金額
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單成立時間
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getOrders.filter((value, index) => page <= index && index < page + 10).map((v, i) => {
                      const finish = orderTimeState.filter((v2, i2) => { if (i2 === i) return v2 })[0]
                      return <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" sx={tdStyle}>
                          {totalShopOrder - (page - 1) * 10 - i}
                          {/* {((page - 1) * 10) + i + 1} */}
                          {/* {i} */}
                        </TableCell>
                        <TableCell align="center" sx={tdStyle}>
                          {new Date(finish.meet_time) < Date.now() ? '已結單' : '未完成'}
                        </TableCell>
                        <TableCell align="center" sx={tdStyle}>
                          <td className={`d-flex flex-column mb-3" ${showOrder == false ? styles.orderShow_hidden : styles.orderShow_show} `}>
                            <div key={i} className='d-flex justify-content-between'>
                              <span className='me-auto fw-bold'>商品</span>
                              <span className='me-1 fw-bold'>數量</span>
                              <span className='fw-bold'>價格</span>
                            </div>
                            {v.titles.map((title, i) => (
                              <div key={i} className='d-flex justify-content-between'>
                                <span className='me-auto'>{title}</span>
                                <span className='me-4'> x </span>
                                <span className='me-4'>{v.amounts[i]}</span>
                                <span>{v.prices[i]}</span>
                              </div>
                            ))}
                          </td>
                        </TableCell>
                        <TableCell align="center" sx={tdStyle}>
                          {v.amounts.reduce((total, amount, index) => {
                            return total + amount * v.prices[index];
                          }, 0)}
                        </TableCell>
                        <TableCell align="center" sx={tdStyle}>
                          {orderTimeState.map((v2, i2) => {
                            if (i2 == i) {
                              return v2.meet_time
                            }
                          })}
                        </TableCell>
                      </TableRow>
                    }
                    )
                    })



                  </TableBody>
                </Table>
              </TableContainer>)

            :

            (<TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={rowStyle}>
                    <TableCell align="center" sx={ceilStyle}>
                      訂單編號
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      訂單狀態
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      訂單內容
                      <button type='button' className={`btn btn-warning ms-auto mt-auto ${muistyles.btnright}`} style={{ visibility: 'visibile' }} onClick={changeShowOrder}>{showOrder == false ? '顯示更多' : '隱藏內容'}</button>
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      總金額
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      訂單成立時間
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      通知完成訂單
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {togoOrder.filter((value, index) => page <= index && index < page + 10).map((v, i) => {
                    return <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" sx={tdStyle}>
                        {orderAmount - (page - 1) * 10 - i}
                        {/* {((page - 1) * 10) + i + 1} */}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {v[0].status}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>


                        <td className={`d-flex flex-column mb-3" ${showOrder == false ? styles.orderShow_hidden : styles.orderShow_show} `}>
                          <div key={i} className='d-flex justify-content-between'>
                            <span className='me-auto fw-bold'>商品</span>
                            <span className='me-1 fw-bold'>數量</span>
                            <span className='fw-bold'>價格</span>
                          </div>
                          {togoOrder[i].map((val, ind) => {
                            return (
                              <>
                                <div key={i} className='d-flex justify-content-between'>
                                  <span className='me-auto'>{val.order_item}</span>
                                  <span className='me-4'> x </span>
                                  <span className='me-4'>{val.order_num}</span>
                                  <span>{val.price}</span>
                                </div>
                              </>
                            )
                          })}
                        </td>
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {v[0].amount}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {v[0].create_at}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {completeOrder ?
                          <div>123</div>
                          :
                          <button type='button' id={`buttonIndex${i}`} className={`btn btn-primary ${muistyles.btnright}`}
                            onClick={() => turnToComplete(i)}
                          >
                            通知完成
                          </button>}
                      </TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </TableContainer>)
          }
        </div>
        <hr />
      </div>
    </>
  );
}
