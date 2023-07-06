import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';

export default function OrderManagement() {
  return (
    <>
      <h1 className="container">OrderManagement-Component</h1>
      <div className="container bg-info bg-subtle p-4 border border-black rounded-4">
      <h2 className='fw-bold'>訂單管理</h2>
      <hr />
        <div className="d-flex justify-content-between">
          <div className="justify-content-between me-3">
            <Btn text="所有訂單" className="me-3" />
            <Btn text="已完成" className="me-3" />
            <Btn text="由新到舊" className="me-3" />
            <Btn text="由舊到新" className="me-3" />
          </div>

          <div>
            <Input placeholder="請輸入搜尋關鍵字" label="請輸入搜尋關鍵字" />
          </div>
        </div>
        <div>
          {/* table */}
          <table class="table table-success table-striped mt-3 table-bordered border-dark">
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
                <td className='text-center'>外帶訂單</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>無</td>
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                <td className='text-center'><Btn text='通知完成訂單'/></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>外帶訂單</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>超級多，好讚</td>
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                <td className='text-center'><Btn text='通知完成訂單'/></td>
              </tr>
              <tr className=''>
                <td className='text-center'>A001</td>
                <td className='text-center'>外帶訂單</td>
                <td className='text-center'>紅醬義大利麵X1,可樂X1</td>
                <td className='text-center'>wrgneorgnoetnh gbeolkm邱禹諾好帥fweingfoiergn</td>
                <td className='text-center'>180</td>
                <td className='text-center'>2023:01-01 18:00:00</td>
                <td className='text-center'><Btn text='通知完成訂單'/></td>
              </tr>

            </tbody>
          </table>
        </div>
        <div>
            <hr />
            <div className='d-flex justify-content-evenly'>
                <Btn text='外帶訂單'/>
                <Btn text='已結單'/>
                <Btn text='尚未結單'/>
                <Btn text='已完成，等待取餐'/>
            </div>
        </div>
      </div>
    </>
  );
}
