import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from './login.module.css';

export default function LoginComponent() {
  return (
    <>
      <h4 className="container">LoginComponent</h4>
      <div className="container d-flex justify-content-between col-10 bg-danger-subtle border rounded-3 ">
        <div className={`${styles.leftdiv} border rounded-3`}>
          <div className="text-light fw-bold">商家登入</div>
          <div className="text-light fw-bold">加入我們，遞送美味</div>
        </div>

        <div className="d-flex flex-column ms-5 me-auto p-3">
          <div className="my-3">
            <Input label="請輸入帳號" placeholder="請輸入帳號" />
          </div>
          <div className="my-3">
            <Input label="請輸入密碼" placeholder="請輸入密碼" />
          </div>
          <div className="my-3 d-flex justify-content-between align-items-center">
            <div className="me-3">
              <Btn text="登入" />
            </div>

            <div className="me-3">還沒有帳號?</div>
            <Btn text="加入我們" />
          </div>
          <div className="d-flex justify-content-between"></div>
        </div>
      </div>
    </>
  );
}
