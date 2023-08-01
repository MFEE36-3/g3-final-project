import { useState } from "react";
import OrderManagement from "@/components/res/order-management.js/order-management";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlankLayout from "@/components/layout/blank-layout";

export default function ResOrderManagement(){
    return <>
        <div>ResOrderManagement</div>
        <OrderManagement />
    </>
}
ResOrderManagement.getLayout = BlankLayout