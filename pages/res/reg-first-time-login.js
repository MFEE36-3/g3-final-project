import { useState } from 'react';
import layoutRes from '@/components/layout/layoutRes'
import 'bootstrap/dist/css/bootstrap.min.css';
import FirstTimeAddItem from '@/components/res/item/first-time-add-item';

const FirstTimeLogin = () => {
    return <>
        {/* <div className='container'>FirstTimeLogin</div> */}
        <FirstTimeAddItem />
    </>
}

FirstTimeLogin.getLayout = layoutRes
export default FirstTimeLogin