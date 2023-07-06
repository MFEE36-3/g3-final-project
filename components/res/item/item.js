import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';

export default function AddNewItem() {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div>
          <div className="card p-5 bg-info rounded-3 border-black border-3">
            <div className="card-title d-flex justify-content-center fw-bold fs-5">
              <Btn text="新增商品" />
              <Btn text="編輯商品" />
            </div>

            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <div className={`${styles.uploadImg}`}>
                <div className="d-flex align-items-center fw-bold fs-5">
                  <button type="button" class="btn btn-outline-dark">
                    上傳圖片
                  </button>
                </div>
              </div>

              <div className="d-flex flex-row mt-3 p-3">
                <Input placeholder="請輸入商品名稱" label="商品名稱" />
              </div>

              <div className="d-flex flex-row p-3">
                <Input placeholder="請輸入商品敘述" label="商品敘述" />
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
                  <Btn text="確認送出" />
                </div>
                <div>
                  <Btn text="取消填寫" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
