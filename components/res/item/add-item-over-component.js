import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/components/res/item/add-item-over.module.css'
import Link from "next/link";

export default function addItemOverComponent() {
    return <>
        <h1 className="container">addItemOverComponent</h1>
        <div className="row">
            <div className={`container ${styles.background} border col-4 border-black rounded-4 d-flex justify-content-center`}>
                <div className="d-flex flex-column mb-3">
                    <div className="fw-bold fs-3 mt-5">您已新增一項商品!</div>
                    <div className="fw-bold fs-3 mt-2">是否繼續新增商品?</div>
                    <div className="d-flex justify-content-center mt-3">

                        <Link href={`/res/add-item`}>
                            <button className="me-3 btn btn-warning fw-bold">繼續新增</button>
                        </Link>
                        <Link href={`/res/item-management`}>
                            <button className="ms-3 btn btn-warning fw-bold">返回列表</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>
}
