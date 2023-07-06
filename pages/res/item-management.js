import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import Management from "@/components/res/item/management";

export default function ItemManagement(){
    return <>
        <h2 className="container mt-3">商品編輯</h2>
        <Management />
    </>
}