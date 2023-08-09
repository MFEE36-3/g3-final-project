import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'

export default function firstTimeAddItem() {

    const router = useRouter()

    return <>
          <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
        <div className='container d-flex justify-content-center'>
            <div className="row d-flex justify-content-center">
                <div className="col-8 d-flex">

                    <div class="card d-flex justify-content-center mt-3">
                        <div class="card-body border rounded-4" style={{ backgroundColor: '#911010', color: 'white', height: '400px', width: '400px' }}>
                            <h5 className="card-title d-flex justify-content-center fw-bold">歡迎來到食GO EAT商家頁面!</h5>
                            <div className='mt-3 d-flex flex-column mb-3 justify-content-center'>
                                <div className="card-text d-flex justify-content-center fw-bold">要來新增您的第一項商品嗎?</div>
                                <div className="card-text d-flex justify-content-center mt-3">
                                    <Link href={`/res/add-item`}>
                                        <button type='button' className='btn btn-warning fw-bold'>新增第一筆商品!</button>
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