import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';

export default function Management() {
  return (
    <>
      <h3 className="container">商品管理</h3>
      <div className="container d-flex flex-column bg-info p-3 border border-4 rounded-4 border-black">
        <div>
          <Btn text="新增商品" />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div className="">
            <Btn text="所有商品" />
            <Btn text="篩選商品" />
            <Btn text="由新到舊" />
            <Btn text="由舊到新" />
          </div>
          <div>
            <Input label='搜尋商品' placeholder='請輸入搜尋文字'/>
          </div>
        </div>

        <div className=''>
          <table className="table mt-3 border border-4 rounded-4 border-black table-success table-striped">
            <thead>
              <tr>
                <th scope="col" className='text-center'>商品名稱</th>
                <th scope="col" className='text-center'>商品敘述</th>
                <th scope="col" className='text-center'>價格</th>
                <th scope="col" className='text-center'>分類</th>
                <th scope="col" className='text-center'>商品圖片</th>
                <th scope="col" className='text-center'>商品備註</th>
                <th scope="col" className='text-center'>編輯商品</th>
                <th scope="col" className='text-center'>刪除商品</th>
              </tr>
            </thead>
            <tbody>
              <tr className=''>
                <td className='text-center'>紅醬義大利麵</td>
                <td className='text-center'>我是這個商品的敘述喔</td>
                <td className='text-center'>120</td>
                <td className='text-center'>主菜</td>
                <td className='text-center'><img src='@/public/res/food-item/img1.jpg'></img></td>
                <td className='text-center'>可換蛋奶素</td>
                <td className='text-center'><Btn text='編輯商品'/></td>
                <td className='text-center'><Btn text='刪除商品'/></td>
              </tr>

              <tr className=''>
                <td className='text-center'>白醬義大利麵</td>
                <td className='text-center'>我是這個商品的敘述喔</td>
                <td className='text-center'>110</td>
                <td className='text-center'>主菜</td>
                <td className='text-center'><img src='@/public/res/food-item/img1.jpg'></img></td>
                <td className='text-center'>可換蛋奶素</td>
                <td className='text-center'><Btn text='編輯商品'/></td>
                <td className='text-center'><Btn text='刪除商品'/></td>
              </tr>

              <tr className=''>
                <td className='text-center'>青醬義大利麵</td>
                <td className='text-center'>我是這個商品的敘述喔</td>
                <td className='text-center'>130</td>
                <td className='text-center'>主菜</td>
                <td className='text-center'><img src='@/public/res/food-item/img1.jpg'></img></td>
                <td className='text-center'>可換蛋奶素</td>
                <td className='text-center'><Btn text='編輯商品'/></td>
                <td className='text-center'><Btn text='刪除商品'/></td>
              </tr>

              <tr className=''>
                <td className='text-center'>海鮮紅醬義大利麵</td>
                <td className='text-center'>我是這個商品的敘述喔</td>
                <td className='text-center'>150</td>
                <td className='text-center'>主菜</td>
                <td className='text-center'><img src='@/public/res/food-item/img1.jpg'></img></td>
                <td className='text-center'>可換蛋奶素</td>
                <td className='text-center'><Btn text='編輯商品'/></td>
                <td className='text-center'><Btn text='刪除商品'/></td>
              </tr>

              <tr className=''>
                <td className='text-center'>肥宅可樂</td>
                <td className='text-center'>我是這個商品的敘述喔</td>
                <td className='text-center'>40</td>
                <td className='text-center'>飲料</td>
                <td className='text-center'><img src='@/public/res/food-item/img1.jpg'></img></td>
                <td className='text-center'>無</td>
                <td className='text-center'><Btn text='編輯商品'/></td>
                <td className='text-center'><Btn text='刪除商品'/></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
