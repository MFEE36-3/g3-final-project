import { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/order-management.js/order-management.module.css'
import ResAuthContext, { } from '@/context/ResAuthContext';

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
  const orderStateOptions = ['所有訂單', '尚未出貨', '已完成，等待取餐', '已結單'];

  // 訂單順序
  const [orderTime, setOrderTime] = useState('')
  const orderTimeOptions = ['由新到舊', '由舊到新']

  // 訂單分類
  const [orderCategory, setOrderCategory] = useState('')
  const orderCategoryOptions = ['揪團','外帶']

  // 拿到resAuth資料
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext)

  // 接後端response的資料
  const [getOrders, setGetOrders] = useState([])  // array
  const [getOrderAmount, setGetOrderAmount] = useState([])

  const getShopOrder = () => {
    fetch(`http://localhost:3003/res/getShopOrder`, {
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
      })
      .catch(error => {
        console.error(error);
        // 在這裡處理錯誤情況
      });
  }

  useEffect(() => {
    if (resAuth.account) {
      getShopOrder();
      console.log(getOrders); // 這裡會顯示空陣列 []，因為 getShopOrder() 還沒完成
    }
  }, [resAuth]);

  useEffect(() => {
    if (getOrders) {
      console.log(getOrders)
    }
  }, [getOrders])

  const amounts = [3, 5, 3, 2, 4, 3, 3, 4, 4, 1, 2, 6, 1, 3, 3, 1];
  const prices = [60, 40, 50, 60, 10, 20, 40, 70, 30, 30, 50, 50, 50, 80, 40, 30];

  // 將amounts和prices對應位置的元素相乘，然後將所有相乘後的數字相加
  const totalAmountPrice = amounts.reduce((total, amount, index) => {
    return total + amount * prices[index];
  }, 0);

  console.log(totalAmountPrice); // 1230

  // 訂單顯示更多或隱藏
  const [showOrder, setShowOrder] = useState(false)
  const changeShowOrder = ()=>{
    setShowOrder(!showOrder)
  }

  return (
    <>
      <h1 className="container">OrderManagement-Component</h1>
      <div className={`container container-sm-fluid ${styles.tableBackGround} bg-subtle p-4 border border-black rounded-4`}>
        <h2 className='fw-bold'>訂單管理</h2>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="justify-content-between me-3">
            <Btn text="所有訂單" className="me-3" />
            <button type='button' className='btn btn-primary ms-3' onClick={logout}>登出</button>
            <div className='mt-3 ms-3 fw-bold fs-4'>歡迎回來，{resAuth.shop}</div>

            <select className="form-select mt-3" value={orderTime} onChange={(e) => {
              setOrderTime(e.target.value)
            }}>
              <option value='/'>---請排列訂單順序---</option>
              {orderTimeOptions.map((v, i) => {
                return <option key={i} value={v}>{v}</option>
              })}
            </select>

            <select className="form-select mt-3" value={orderState} onChange={(e) => { setOrderState(e.target.value) }}>
              <option selected value={``}>---訂單狀態----</option>
              {orderStateOptions.map((v, i) => {
                return <option key={i} value={v}>{v}</option>
              })}
            </select>

            <select className='form-select mt-3' value={orderCategory} onChange={(e)=>{
              setOrderCategory(e.target.value)
            }}>
              <option value={``}>---訂單種類---</option>
              {orderCategoryOptions.map((v,i)=>{
                return <option key={i} value={v}>{v}</option>
              })}
            </select>
          </div>

          <div>
            <Input placeholder="請輸入搜尋關鍵字" label="請輸入搜尋關鍵字" />
          </div>
        </div>
        <div>
          {/* table */}
          <table class="table table-warning table-striped mt-3 table-borderless border-dark">
            <thead>
              <tr>
                <th scope="col" className='text-center'>訂單編號</th>
                <th scope="col" className='text-center'>訂單狀態</th>
                <th scope="col" className='text-center'>訂單內容
                <button type='button' className='btn btn-warning ms-auto mt-auto' style={{visibility:'visibile'}} onClick={changeShowOrder}>{showOrder == false ? '顯示更多':'隱藏內容'}</button>
                </th>
                <th scope="col" className='text-center'>總金額</th>
                <th scope="col" className='text-center'>訂單成立時間</th>
                <th scope="col" className='text-center'>通知完成訂單</th>
              </tr>
            </thead>
            <tbody>
              {getOrders.map((v, i) => {
                return <tr key={i}>
                  <td className='text-center'>{i}</td>
                  <td className='text-center'>已結單</td>
                  <td className={`d-flex flex-column mb-3" ${ showOrder == false ? styles.orderShow_hidden: styles.orderShow_show} `}>
                  {/* <td className={`d-flex flex-column mb-3"`}> */}

                    <div key={i} className='d-flex justify-content-between'>
                      <span className='me-auto fw-bold'>商品</span>
                      {/* <span className='me-3'> x </span> */}
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

                    <button type='button' className='btn btn-warning ms-auto mt-auto' style={{visibility:'visibile'}} onClick={changeShowOrder}>{showOrder == false ? '顯示更多':'隱藏內容'}</button>

                  </td>
                  <td className='text-center'>{v.amounts.reduce((total, amount, index) => {
                    return total + amount * v.prices[index];
                  }, 0)}</td>
                  <td className='text-center'>
                    {orderTimeState.map((v2,i2)=>{
                      if(i2 == i){
                        return v2.meet_time
                      }
                    })}
                  </td>
                  <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
                </tr>
              })}

              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>尚未出貨</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                {/* <td className='text-center'>無</td> */}
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                {/* <td className='text-center'><Btn text='通知完成訂單' /></td> */}
                <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>已完成，等待取餐</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                {/* <td className='text-center'>超級多，好讚</td> */}
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                {/* <td className='text-center'><Btn text='通知完成訂單' /></td> */}
                <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>已結單</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                {/* <td className='text-center'>不要付餐具，謝謝</td> */}
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                {/* <td className='text-center'><Btn text='通知完成訂單' /></td> */}
                <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
              </tr>

            </tbody>
          </table>
        </div>
        <div>
          <hr />
          <div className='d-flex justify-content-evenly'>
            {/* <Btn text='外帶訂單' />
            <Btn text='已結單' />
            <Btn text='尚未結單' />
            <Btn text='已完成，等待取餐' /> */}

            {/* <button type='button' className='btn btn-primary'>外帶訂單</button>
            <button type='button' className='btn btn-success'>已結單</button>
            <button type='button' className='btn btn-warning'>尚未結單</button>
            <button type='button' className='btn btn-danger'>已完成，等待取餐</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
