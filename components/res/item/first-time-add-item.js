import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from './add-item.module.css';

export default function firstTimeAddItem() {

    const router = useRouter()

    return <>
          <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
        <div className='container d-flex justify-content-center'>
            <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex mt-5">

                    <div class="d-flex justify-content-center mt-5" style={{height:200}}>
                        <div class="">
                            <h5 className=" d-flex justify-content-center fw-bold" style={{fontFamily:'var(--ff1)',fontSize:'var(--h4)'}}>歡迎來到 <span className='mx-2' style={{color:'var(--main-color)'}}>食GOEAT!</span> 商家頁面!</h5>
                            <div className='mt-3 d-flex flex-column mb-3 justify-content-center'>
                                <h5 className="d-flex justify-content-center fw-bold" style={{fontFamily:'var(--ff1)',fontSize:'var(--h4)'}}>要來新增您的第一項商品嗎?</h5>
                                <div className=" d-flex justify-content-center mt-3">
                                    <Link href={`/res/add-item`}>
                                        <button type='button' className={'btn text-light fw-bold '+styles.btn_right}>新增第一筆商品!</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}