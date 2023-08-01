import { useState } from "react";
import layoutRes from '@/components/layout/layoutRes'
import Edit from '@/components/res/item/edit-item-component'

const EditItem = () => {
    return <>
        <div className="container">EditItem</div>
        <Edit />
    </>
}

EditItem.getLayout = layoutRes
export default EditItem