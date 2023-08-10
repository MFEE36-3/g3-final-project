import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'

export default function regSuccessComponent() {

    const router = useRouter()

    const switchToItemPageAfter5sec = () => {
        setTimeout(() => {
            router.push('/res/reg-first-time-login')
        }, 5000);
    }

    useEffect(() => {
        switchToItemPageAfter5sec()
    }, [])

    return <>
        <Head>
            <title>食GOEAT! / 商家中心</title>
        </Head>
        <div className='container d-flex justify-content-center'>
            <div className="row d-flex justify-content-center">
                <div className="col-8 d-flex">

                    <div className='d-flex flex-column mb-3 align-items-center border rounded-4 border-black border-3' style={{ border: '1px solid black', backgroundColor: '#F2E0E7', height: '800px', width: '1200px' }}>

                        <div className='d-flex justify-content-between mt-3'>
                            <h2 className='fw-bold me-5'><Link href='/' />會員註冊</h2>
                            <h2 className='fw-bold ms-5'><Link href='/' />商家註冊</h2>
                            <hr />
                        </div>

                        <div class="card d-flex justify-content-center mt-3">
                            <div class="card-body border rounded-4" style={{ backgroundColor: '#911010', color: 'white', height: '400px', width: '400px' }}>
                                <h5 class="card-title d-flex justify-content-center fw-bold">註冊成功!</h5>
                                <div className='mt-3'>
                                    <p class="card-text d-flex justify-content-center">即將在5秒鐘後跳轉</p>
                                    <p class="card-text d-flex justify-content-center">若沒有跳轉，請<Link href='/res/item-management'>按這裡</Link>以進行跳轉</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}