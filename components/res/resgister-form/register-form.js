import { useState } from 'react';
import BlankLayout from '@/components/layout/blank-layout';
import InputTest from '@/components/common/input-test';
import BtnTest from '@/components/common/btn-test';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerformcss from './res-resgister-form.module.css';

export default function RegisterForm() {
  const [subForm, setSubForm] = useState({
    shop: '',
    city: '',        // 存option的value
    open_time: []    // 存checkbox的value
  })

  return (
    <>
      <div className="container">RegisterForm-Component</div>
      <div className="container">
        <form className={`${registerformcss.backGroundColor} container col-8 border border-black rounded-4 border-4`}>
          <h1 className="d-flex justify-content-center fw-bold mt-3">商家註冊</h1>
          <hr />

          <div className='mx-5'>
            <label for="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control border-success mt-2" id="exampleFormControlInput1" placeholder="name@example.com" />

          </div>

          <div className="mx-5">
            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex flex-row align-items-center">
                <div for="shop" className="form-label mb-3">
                  店名:
                </div>
                <div className="ms-3">
                  <Input label="店名" placeholder="請輸入店名" />
                  <div id="shop" className="form-text">
                    請填入完整店名
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center ms-5">
                <div for="phone" className="form-label mb-3">
                  電話:
                </div>
                <div className="ms-3">
                  <Input label="電話" placeholder="請輸入電話" />
                  <div id="phone" className="form-text">
                    電話格式範例:0918123456
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex flex-row align-items-center">
                <div for="account" className="form-label mb-3">
                  帳號:
                </div>
                <div className="ms-3">
                  <Input label="店名" placeholder="請輸入帳號" />
                  <div id="account" className="form-text">
                    請以電子信箱做為帳號
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center">
                <div for="password" className="form-label mb-3">
                  密碼:
                </div>
                <div className="ms-3">
                  <Input label="密碼" placeholder="請輸入密碼" />
                  <div id="password" className="form-text">
                    密碼需要至少六個英數字
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mt-3">
              <div className="d-flex flex-row align-items-center">
                <div for="account" className="form-label mb-3">
                  負責人姓名:
                </div>
                <div className="ms-3">
                  <Input label="負責人姓名" placeholder="請輸入負責人姓名" />
                  <div id="account" className="form-text"></div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mt-3">
              <div className="d-flex flex-row align-items-center">
                <div for="res_photo" className="form-label mb-3">

                </div>
                <div for="res_photo" className={`${registerformcss.uploadImg}`}>
                  上傳商家照:
                </div>
                <div className="ms-3">
                  <input type="file"></input>
                  <div id="res_photo" className="form-text"></div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mt-3">
              <div className="d-flex flex-row align-items-center"></div>
            </div>

            <div className="d-flex justify-content-between mt-3 col-6">
              <select
                className="form-select me-3"
                aria-label="Default select example"
              >
                <option selected>請選擇縣市</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <select className="form-select" aria-label="Default select example">
                <option selected>請選擇鄉鎮</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="ms-3">
                <Input label="請填入完整地址" placeholder="請輸入完整地址" />
                <div id="shop" className="form-text">
                  請填入完整地址
                </div>
              </div>
            </div>

            <div className="d-flex flex-column mb-3 mt-3">
              <div id="open_time" className="form-text">
                請選擇營業時間
              </div>
              <div className="col-3">
                <div className="d-flex flex-row">
                  <select className="form-select col-3">
                    <option selected>開始營業時間</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="mx-3">:</div>
                  <select className="form-select col-3">
                    <option selected>結束營業時間</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="ms-3">
                <div id="open_time" className="form-text">
                  請選擇營業日期:
                </div>

                <div className="d-flex justify-content-between">
                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Monday"
                      name="Monday"
                      id="Monday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Monday">
                      星期一
                    </label>
                  </div>

                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Tuesday"
                      name="Tuesday"
                      id="Tuesday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Tuesday">
                      星期二
                    </label>
                  </div>

                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Wednesday"
                      name="Wednesday"
                      id="Wednesday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Wednesday">
                      星期三
                    </label>
                  </div>

                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Thursday"
                      name="Thursday"
                      id="Thursday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Thursday">
                      星期四
                    </label>
                  </div>

                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Friday"
                      name="Friday"
                      id="Friday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Friday">
                      星期五
                    </label>
                  </div>

                  <div className="me-3">
                    <input
                      type="checkbox"
                      value="Saturday"
                      name="Saturday"
                      id="Saturday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Saturday">
                      星期六
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      value="Sunday"
                      name="Sunday"
                      id="Sunday"
                      className="me-3"
                    ></input>
                    <label className="form-check-label" for="Sunday">
                      星期日
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-5">
              <div className="mt-3">如欲開放訂位功能，請勾選並填寫桌型:</div>

              <div className="d-flex flex-row my-3">
                <button className="me-2">一般桌型</button>
                <button className="ms-5">進階桌型</button>
              </div>

              <div>
                <Input label="請輸入可內用人數" placeholder="請輸入可內用人數" />
              </div>

              <div className="mt-3">
                <div>(這個是進階桌型的部分)</div>
                <div className=" d-flex align-items-center justify-content-between">
                  <select className="form-select me-3">
                    <option selected>兩人桌</option>
                    <option value="1">四人桌</option>
                    <option value="2">六人桌</option>
                    <option value="3">八人桌</option>
                  </select>
                  <Input label="幾桌" placeholder="請輸入幾桌" />
                </div>
                <div>
                  <button>+新增桌型</button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="justify-content-between d-flex align-items-center">
                <Input label="Verfiy Code" placeholder="請輸入驗證碼" />
                <button className="ms-3">寄送驗證碼</button>
              </div>
            </div>

            <hr />

            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary my-3 mx-3">
                確認送出
              </button>

              <button type="reset" className="btn btn-primary my-3 mx-3">
                取消填寫
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
