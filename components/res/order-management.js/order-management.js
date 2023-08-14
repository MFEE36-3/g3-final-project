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
import Image from 'next/image';
import hamburger from '@/public/buyforme/map/user_icon/hamburger.svg'

export default function OrderManagement() {

  // SELECT `open_sid`, `target_store`, `open_time`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN `buy_for_me_detail` ON `open_for_you`.`open_sid` = `buy_for_me_detail`.`order_sid`;

  // 串三張:
  // SELECT `order_sid`, `open_sid`, `target_store`, `open_time`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN ( SELECT `buy_for_me`.`order_sid`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `buy_for_me` JOIN `buy_for_me_detail` ON `buy_for_me`.`order_sid` = `buy_for_me_detail`.`order_sid` ) AS `result1` ON `open_for_you`.`open_sid` = `result1`.`order_sid`;

  // 串四張(加了食物名稱):
  // SELECT `subA`.`open_sid`, `subA`.`order_sid`, `buy_for_me_detail`.`order_food`, `buy_for_me_detail`.`order_quantity`, `buy_for_me_detail`.`order_price`, `buy_for_me_detail`.`order_detail_sid`, `subA`.`target_store`, `subA`.`open_time`, `subA`.`order_instructions`, `food_items_try`.`food_title`, `food_items_try`.`food_id` FROM ( SELECT `open_for_you`.`open_sid`, `open_for_you`.`target_store`, `open_for_you`.`open_time`, `buy_for_me`.`order_sid`, `buy_for_me`.`order_instructions` FROM `open_for_you` JOIN `buy_for_me` ON `open_for_you`.`open_sid` = `buy_for_me`.`open_sid` ) AS `subA` JOIN `buy_for_me_detail` ON `buy_for_me_detail`.`order_sid` = `subA`.`order_sid` JOIN `food_items_try` ON `food_items_try`.`food_id` = `buy_for_me_detail`.`order_food` WHERE `target_store` = 1;
  // console.log('------')

  // 訂單狀態
  const [orderState, setOrderState] = useState('')
  const [orderTimeState, setOrderTimeState] = useState('')
  const orderStateOptions = ['所有訂單', '未完成', '已完成',];

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
        // console.log(data);
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
      // console.log(getOrders)
    }
  }, [getOrders])

  // console.log(totalShopOrder)
  // console.log(totalShopPage)    // int

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
        // console.log(data)   // array

        const orders = data.orders  // array
        // console.log(groupedOrderItems)
        const sortedOrders = orders.slice().sort((a, b) => b.order_detail[0].sid - a.order_detail[0].sid)
        // setOriginalOrder(sortedOrders)
        // console.log(sortedOrders)
        setTogoOrder(sortedOrders)
        // for(let i = 0; i < sortedOrders.length; i ++){
        //   sortedOrders
        // }
        sortedOrders.forEach((v, i) => {
          v.order_detail[0].status == '已完成' ? v.finished = true : v.finished = false
        })
        // console.log(sortedOrders)
        // setTogoOrder([...sortedOrders])
        setOriginalTogoOrder(sortedOrders)

        const dataLength = data.orders.length
        const totalPages = Math.ceil(dataLength / 10)
        setOrderAmount(data.length)
        setTotalTogoPage(totalPages)
      })
  }


  useEffect(() => {
    if (resAuth.account) {
      getShopOrder();
      getTogoOrder();
      // console.log(getOrders); // 這裡會顯示空陣列 []，因為 getShopOrder() 還沒完成
    }
  }, [resAuth]);

  // console.log(originalTogoOrder)
  // 訂單狀態
  const stateChange = () => {
    // console.log(originalTogoOrder)
    if (orderState == '所有訂單') {
      setTogoOrder(originalTogoOrder)
      setTotalTogoPage(Math.ceil(originalTogoOrder.length / 10))
    }
    if (orderState == '未完成') {
      const stateResult = originalTogoOrder.filter((v, i) => {
        // const arr = v.filter((v2, i2) => v2.status == '未完成');
        // if (arr.length !== 0) return v;
        if (v.order_detail[0].status === 0) {
          return v
        }
      })
      setTogoOrder(stateResult)
      // console.log(stateResult)
      setTotalTogoPage(Math.ceil(stateResult.length / 10))
    }
    if (orderState == '已完成') {
      const stateResult = originalTogoOrder.filter((v, i) => {
        // const arr = v.filter((v2, i2) => v2.status == '未完成');
        // if (arr.length !== 0) return v;
        if (v.order_detail[0].status === 1) {
          return v
        }
      })
      setTogoOrder(stateResult)
      // console.log(stateResult.length)
      setTotalTogoPage(Math.ceil(stateResult.length / 10))
    }
  }
  useEffect(() => {
    stateChange()
  }, [orderState])

  const amounts = [3, 5, 3, 2, 4, 3, 3, 4, 4, 1, 2, 6, 1, 3, 3, 1];
  const prices = [60, 40, 50, 60, 10, 20, 40, 70, 30, 30, 50, 50, 50, 80, 40, 30];

  // 將amounts和prices對應位置的元素相乘，然後將所有相乘後的數字相加
  const totalAmountPrice = amounts.reduce((total, amount, index) => {
    return total + amount * prices[index];
  }, 0);

  // console.log(totalAmountPrice); // 1230

  // 訂單顯示更多或隱藏
  const [showOrder, setShowOrder] = useState(false)
  const changeShowOrder = () => {
    setShowOrder(!showOrder)
  }

  const [completeOrder, setCompleteOrder] = useState(false)
  const turnToComplete = (i) => {
    setCompleteOrder(true)


    // console.log(originalTogoOrder)
    // setTogoOrder([...originalTogoOrder, originalTogoOrder[i].finished = true])
    setTogoOrder([...originalTogoOrder, originalTogoOrder[i].finished = true, originalTogoOrder[i].order_detail[0].status = '已完成'])
    stateChange()
    Swal.fire(
      '已完成該筆訂單!',
      '',
      'success'
    );
  }

  // 設置切換呈現資料的狀態
  const [page, setPage] = useState(1)
  const [orderList, setOrderList] = useState(0)
  const handleChange = (event, value) => {
    // 在這裡處理頁碼變化的邏輯
    // console.log(`跳轉到頁碼：${value}`);
    setPage(value)
    setOrderList((value - 1) * 10)
  };

  // 關鍵字搜尋
  const [getKeyword, setGetKeyword] = useState('')
  // 如果沒有搜到的話
  const [noKeyWordMessage, setNoKeyWordMessage] = useState('')

  // 搜尋到的彈跳文字
  const [hintWord, setHintWord] = useState('')

  const searchKeyword = () => {
    setNoKeyWordMessage('')
    setHintWord('')
    // console.log(getKeyword)
    if (getKeyword) {
      const searchResult = originalTogoOrder.filter((v, i) => {
        const arr = v.order_detail.filter((v2) => v2.order_item.includes(getKeyword));
        return arr.length !== 0;
      })
      //console.log(originalTogoOrder)
      if (searchResult.length === 0) {        // 沒有這筆訂單
        // setNoKeyWordMessage('沒有這項訂單!')
        setTogoOrder(originalTogoOrder)
        setHintWord('沒有這項訂單!')
        setTotalTogoPage(Math.ceil((originalTogoOrder.length) / 10))
        Swal.fire({
          icon: 'error',
          title: '沒有這項商品!',
          text: '請試著搜尋其它關鍵字',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      } else {
        const searchResult_arr = [];
        // console.log(searchResult_arr)
        setTogoOrder(searchResult)
        // console.log(Math.ceil((searchResult.length) / 10))
        setTotalTogoPage(Math.ceil((searchResult.length) / 10))

        // 彈跳關鍵字
        setHintWord(`共有:${searchResult.length}筆資料符合搜尋結果`)
      }
    } else {
      setTogoOrder(originalTogoOrder)
      setTotalTogoPage(Math.ceil((originalTogoOrder.length) / 10))
    }

  }

  // 以下為樣式
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
    width: '95%',
  }

  return (
    <>
      <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
      <div className={`container container-sm-fluid pt-3 px-4 pb-5 mt-4 ${styles.tableBackGround}`}>
        <h2 className={styles.res_title}>訂單管理</h2>
        <div className='mt-3 ms-3 fw-bold fs-4 mb-3 d-flex align-items-center'>
          <Image src={hamburger} width={80} />
          <div className='ms-3'>
            歡迎回來，{resAuth.shop}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">

          <div className='d-flex'>

            <select className={'p-2 my-3 ms-3 ' + styles.select_cate} value={orderCategory} onChange={(e) => {
              setOrderCategory(e.target.value)
            }}>
              {orderCategoryOptions.map((v, i) => {
                return <option key={i} value={v}>{v}</option>
              })}
            </select>

            {orderCategory == '揪團' ? '' : <select className={'p-2 my-3 ' + styles.select_cate} value={orderState} onChange={(e) => { setOrderState(e.target.value) }}>
              <option selected value={``}>---訂單狀態----</option>
              {orderStateOptions.map((v, i) => {
                return <option key={i} value={v}>{v}</option>
              })}
            </select>}
          </div>
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
          <div className=''>
            {/* <div className='d-flex justify-content-end me-3 mb-3'>
              <Btn text="所有訂單" padding='10px 20px' />
            </div> */}
            <div className='fw-bold mb-2'>{hintWord}</div>
            <div className='d-flex'>
              <div>
                <Input placeholder="請輸入搜尋關鍵字" label="請輸入搜尋關鍵字" sx={mui_style} onChange={(e) => {

                  setGetKeyword(e.target.value)

                  // console.log(togoOrder.filter((v, i) => {
                  //   const arr = v.filter((v2, i2) => v2.order_item.includes(e.target.value));
                  //   if (arr.length !== 0) return v;
                  // }))
                }} />
              </div>
              <Btn text='搜尋' padding='10px 20px' onClick={searchKeyword}></Btn>
            </div>
          </div>
        </div>

        <div className='mt-3'>
          {orderCategory == '揪團' ?
            (
              <TableContainer sx={{ borderRadius: 2, border: '2px solid var(--main-color)' }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={rowStyle}>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單編號
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle}>
                        訂單狀態
                      </TableCell>
                      <TableCell align="center" sx={ceilStyle} className='me-3'>
                        <span className='me-2'>訂單內容</span>
                        <Btn type='button'  padding='15px 20px' fs='var(--h7)' sx={{marginLeft:'5px'}} onClick={changeShowOrder} text={showOrder == false ? '顯示更多' : '隱藏內容'}></Btn>
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
                    {getOrders.filter((value, index) => (page - 1) * 10 <= (index + 1) && index < (page - 1) * 10 + 9).map((v, i) => {

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
                    }
                  </TableBody>
                </Table>
              </TableContainer>)

            :

            (<TableContainer sx={{ borderRadius: 2, border: '2px solid var(--main-color)' }}>
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
                    <span className='me-2'>訂單內容</span>
                      <Btn type='button' padding='15px 20px' fs='var(--h7)' sx={{marginLeft:'5px'}} onClick={changeShowOrder} text={showOrder == false ? '顯示更多' : '隱藏內容'}></Btn>
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      總金額
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      訂單成立時間
                    </TableCell>
                    <TableCell align="center" sx={ceilStyle}>
                      完成訂單
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {togoOrder.filter((value, index) => (page - 1) * 10 <= (index + 1) && index < (page - 1) * 10 + 9).map((v, i) => {
                    {/* console.log(togoOrder) */ }
                    return <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" sx={tdStyle}>
                        {/* {orderAmount - (page - 1) * 10 - i} */}
                        {/* {((page - 1) * 10) + i + 1} */}
                        {v.order_detail[0].sid}
                        {/* {v.order_sid} */}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {/* {v[0].status} */}
                        {v.order_detail[0].status === 0 ? '未完成' : '已完成'}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>


                        <td className={`d-flex flex-column mb-3" ${showOrder == false ? styles.orderShow_hidden : styles.orderShow_show} `}>
                          <div key={i} className='d-flex justify-content-between'>
                            <span className='me-auto fw-bold'>商品</span>
                            <span className='me-1 fw-bold'>數量</span>
                            <span className='fw-bold'>價格</span>
                          </div>
                          {/* {togoOrder[i].map((val, ind) => {
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
                          })} */}
                          {v.order_detail.map((val, ind) => {
                            return (<>
                              <div key={i} className='d-flex justify-content-between'>
                                <span className='me-auto'>{val.order_item}</span>
                                <span className='me-4'> x </span>
                                <span className='me-4'>{val.order_num}</span>
                                <span>{val.price}</span>
                              </div>
                            </>)
                          })}
                        </td>
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {/* {v[0].amount} */}
                        {v.order_detail[0].amount}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {/* {v[0].create_at} */}
                        {v.order_detail[0].create_at}
                      </TableCell>
                      <TableCell align="center" sx={tdStyle}>
                        {v.finished ?
                          <div>訂單已完成!</div>
                          :
                          <Btn id={`buttonIndex${i}`} padding='10px 15px' fs='var(--h7)' text='完成訂單'
                            onClick={() => turnToComplete(i)}
                          >
                          </Btn>}
                        {/* {v.order_detail[0].status == '未完成' ? v.finished ?
                          <div>訂單已完成!</div>
                          :
                          <button type='button' id={`buttonIndex${i}`} className={`btn btn-primary ${muistyles.btnright}`}
                            onClick={() => turnToComplete(i)}
                          >
                            完成訂單
                          </button> : '訂單已完成!'} */}
                      </TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </TableContainer>)
          }
        </div>
      </div>
    </>
  );
}
