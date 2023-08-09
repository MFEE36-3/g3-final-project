import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/components/res/item/add-item-over.module.css'
import Link from "next/link";
import muistyles from '@/components/res/item/add-item.module.css';
import Head from 'next/head'

export default function addItemOverComponent() {
    return <>
        <Head>
            <title>食GOEAT! / 商家中心</title>
        </Head>
        <div className="row mt-3">
            <div className={`container ${styles.background} border col-4 border-black rounded-4 d-flex justify-content-center`}>
                <div className="d-flex flex-column mb-3">
                    <div className="fw-bold fs-3 mt-5">您已新增一項商品!</div>
                    <div className="fw-bold fs-3 mt-2">是否繼續新增商品?</div>
                    <div className="d-flex justify-content-center mt-3">

                        <Link href={`/res/add-item`}>
                            <button className={`me-3 btn btn-warning fw-bold ${muistyles.btnright}`}>繼續新增</button>
                        </Link>
                        <Link href={`/res/item-management`}>
                            <button className={`me-3 btn btn-warning fw-bold ${muistyles.btnright}`}>返回列表</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>
}
