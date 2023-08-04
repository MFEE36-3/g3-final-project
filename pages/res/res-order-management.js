import { useState } from "react";
import layoutRes from '@/components/layout/layoutRes'
import OrderManagement from "@/components/res/order-management.js/order-management";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlankLayout from "@/components/layout/blank-layout";

const ResOrderManagement = () => {
    return <>
        {/* <div>ResOrderManagement</div> */}
        <OrderManagement />
    </>
}
ResOrderManagement.getLayout = layoutRes
export default ResOrderManagement
