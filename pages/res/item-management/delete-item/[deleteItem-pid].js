import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Head from 'next/head'

export default function deleteItem() {

    const router = useRouter()
    const backtoItemManagement = () => {
        router.push('/res/item-management')
    }

    const deleteItem = async () => {
        fetch()
    }

    return <>
        <Head>
            <title>食GOEAT! / 商家中心</title>
        </Head>
        <h1 className="container">deleteItem</h1>
    </>
}