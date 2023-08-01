import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import Link from 'next/link';

export default function EditItem() {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div>
          <div className="card p-5 bg-info rounded-3 border-black border-3">
            <div className="card-title d-flex justify-content-center fw-bold fs-5 ">
              <div>
                <Link href={`/res/add-item`}>
                  <Btn text="新增商品" />
                </Link>
              </div>
              <div>
                <Link href={`/res/item-management`}>
                  <Btn text="返回列表" />
                </Link>
              </div>
            </div>

            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className={`${styles.uploadImg}`}>
                <div className="d-flex align-items-center fw-bold fs-5">
                  <img src='@/public/res/food-item/img1.jpg'></img>
                  <button type="button" class="btn btn-outline-dark">
                    上傳圖片
                  </button>
                </div>
              </div>

              <div className="d-flex flex-row mt-3 p-3">
                <Input placeholder="請輸入新商品名稱" label="紅醬義大利麵" value='紅醬義大利麵' />
              </div>

              <div className="d-flex flex-row p-3">
                <Input placeholder="請輸入新商品敘述" label="我是這個商品的敘述喔" />
              </div>

              <div className="d-flex justify-content-evenly p-3">
                <div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="價格">
                  <Input label="價格" placeholder="請輸入價格" />
                </div>
                <div className="備註">
                  <Input label="備註" placeholder="請輸入備註事項" />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <Btn text="確認編輯" />
                </div>
                <div>
                  <Btn text="取消編輯" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
