import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import Setting from '@/components/res/res-setting/setting';

export default function ResSetting(){
    return <>
        <h3 className='container'>ResSetting</h3>
        <Setting />
    </>
}