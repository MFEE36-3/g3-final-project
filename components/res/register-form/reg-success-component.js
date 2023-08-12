import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'
import styles from './res-resgister-form.module.css'

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
            <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="d-flex mt-5" style={{height:200}}>

                    <div className='d-flex flex-column mb-3 align-items-center'>

                        <div class="d-flex justify-content-center mt-3">
                            <div class="">
                                <div class="d-flex justify-content-center fw-bold" style={{fontFamily:'var(--ff1)',fontSize:'var(--h3)',color:'var(--main-color)'}}>註冊成功!</div>
                                <div className='mt-3'>
                                    <p class="d-flex justify-content-center" style={{fontFamily:'var(--ff1)',fontSize:'var(--h4)'}}>即將在5秒鐘後跳轉</p>
                                    <p class={"d-flex justify-content-center "} style={{fontFamily:'var(--ff1)',fontSize:'var(--h4)'}}>若沒有跳轉，請<Link href='/res/item-management'><span className='mx-2' style={{color:'var(--main-color)'}}>按這裡</span></Link>以進行跳轉</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}