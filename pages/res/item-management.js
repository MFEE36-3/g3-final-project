import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import layoutRes from '@/components/layout/layoutRes'
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import Management from "@/components/res/item/item-management";

const ItemManagement = () => {
    return <>
        <Management />
    </>
}
ItemManagement.getLayout = layoutRes
export default ItemManagement
