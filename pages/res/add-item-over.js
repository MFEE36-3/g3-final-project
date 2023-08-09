import React from "react";
import layoutRes from '@/components/layout/layoutRes'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemOverComponent from "@/components/res/item/add-item-over-component";

const addItemOver = () => {

    return <>
        <AddItemOverComponent />
    </>
}

addItemOver.getLayout = layoutRes
export default addItemOver