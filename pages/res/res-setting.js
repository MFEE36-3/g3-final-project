import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import layoutRes from '@/components/layout/layoutRes'
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import Setting from '@/components/res/res-setting/setting';

const ResSetting = () => {
    return <>
        <Setting />
    </>
}

ResSetting.getLayout = layoutRes
export default ResSetting