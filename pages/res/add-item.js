import { useState } from "react";
import layoutRes from '@/components/layout/layoutRes'
import AddNewItem from "@/components/res/item/add-item";

const AddItem = () => {
    return <>
        <div className="container">AddItem</div>
        <AddNewItem />
    </>
}

AddItem.getLayout = layoutRes

export default AddItem

