import { useState,useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/order-management.js/order-management.module.css'
import ResAuthContext,{} from '@/context/ResAuthContext';

export default function OrderManagement() {

  // SELECT `open_sid`, `target_store`, `open_time`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN `buy_for_me_detail` ON `open_for_you`.`open_sid` = `buy_for_me_detail`.`order_sid`;

  // 串三張:
  // SELECT `order_sid`, `open_sid`, `target_store`, `open_time`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `open_for_you` JOIN ( SELECT `buy_for_me`.`order_sid`, `order_instructions`, `order_food`, `order_quantity`, `order_price` FROM `buy_for_me` JOIN `buy_for_me_detail` ON `buy_for_me`.`order_sid` = `buy_for_me_detail`.`order_sid` ) AS `result1` ON `open_for_you`.`open_sid` = `result1`.`order_sid`;

  const [orderState, setOrderState] = useState('')
  const orderStateOptions = ['所有訂單','尚未出貨','已完成，等待取餐', '已結單'];

  const [orderTime, setOrderTime] = useState('')
  const orderTimeOptions = ['由新到舊','由舊到新']

  // 拿到resAuth資料
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext)

  const getShopOrder = () => {
    fetch(`http://localhost:3003/res/getShopOrder`,{
      method:'POST',
      body: JSON.stringify(resAuth),
      headers:{"Content-Type" : "application/json"}
    })
    .then(r=>r.json())
    .then(data => {
      console.log(data)
    })
  }

  useEffect(()=>{
    if(resAuth.account){
      getShopOrder()
    }
  },[resAuth])

  return (
    <>
      <h1 className="container">OrderManagement-Component</h1>
      <div className={`container container-sm-fluid ${styles.tableBackGround} bg-subtle p-4 border border-black rounded-4`}>
        <h2 className='fw-bold'>訂單管理</h2>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="justify-content-between me-3">
            <Btn text="所有訂單" className="me-3" />

            {/* <Btn text="尚未結單" className="me-3" />
            <Btn text="已完成" className="me-3" />
            <Btn text="由新到舊" className="me-3" />
            <Btn text="由舊到新" className="me-3" /> */}

            <select className="form-select mt-3" value={orderTime} onChange={(e)=>{
              setOrderTime(e.target.value)
            }}>
              <option value='/'>---請排列訂單順序---</option>
              {orderTimeOptions.map((v,i)=>{
                return <option key={i} value={v}>{v}</option>
              })}
            </select>

            <select className="form-select mt-3" value={orderState} onChange={(e)=>{setOrderState(e.target.value)}}>
              <option selected value={``}>訂單狀態:</option>
              {orderStateOptions.map((v,i)=>{
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
                <th scope="col" className='text-center'>訂單內容</th>
                <th scope="col" className='text-center'>備註</th>
                <th scope="col" className='text-center'>總金額</th>
                <th scope="col" className='text-center'>訂單成立時間</th>
                <th scope="col" className='text-center'>通知完成訂單</th>
              </tr>
            </thead>
            <tbody>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>尚未出貨</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>無</td>
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                {/* <td className='text-center'><Btn text='通知完成訂單' /></td> */}
                <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>已完成，等待取餐</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>超級多，好讚</td>
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                {/* <td className='text-center'><Btn text='通知完成訂單' /></td> */}
                <td className='text-center'><button type='button' className='btn btn-primary'>通知完成</button></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>已結單</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>不要付餐具，謝謝</td>
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
