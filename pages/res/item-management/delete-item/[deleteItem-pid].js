import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";

export default function deleteItem(){
    
    const router = useRouter()
    const backtoItemManagement = ()=>{
        router.push('/res/item-management')
    }

    const deleteItem = async () => {
        fetch()
    }

    // useEffect(()=>{
    //     backtoItemManagement()
    // },[])
    return <>
        <h1 className="container">deleteItem123</h1>
    </>
}