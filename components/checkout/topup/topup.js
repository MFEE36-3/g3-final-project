import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Money from '@/public/trycheckoutimage/money.svg'
import CheckBox from '@/components/checkout/topup/checkbox';
import Button from '@mui/material/Button';
import PaymentForCash from '@/components/checkout/topup/paymentforcash';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
const Money1 = styled.img`
    @keyframes MoneyRun{
        0%{
            transform:rotateY(0deg)
        }
        50%{
            transform:rotateY(360deg)
        }
        100%{
            transform:rotateY(720deg)
        }
    }
    animation: MoneyRun 8s ease infinite;
`
export default function AddCash() {
    const [memberInfo, setMemberInfo] = useState([])
    const [payment, setPayment] = useState('')
    const host = process.env.API_SERVER
    const [addValue, setAddValue] = useState(100)
    const router = useRouter()
    const backToMember = () => {
        router.push({ pathname: "http://localhost:3000/member" })
    }
    const backToCheckout = () => {
        router.push({ pathname: "http://localhost:3000/checkout" })
    }
    useEffect(() => {
        const member = JSON.parse(localStorage.getItem('auth'))
        const getInfo = async () => {
            const response = await fetch(`${host}/member`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${member.token}`
                }
            })
            const [data] = await response.json()

            setMemberInfo(data)
        }
        getInfo()
    }, [])
    const topUp = async () => {
        if (payment === '') {
            return (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<div style="font-family: Mochiy Pop One;">請選擇支付方式!</div>',
            }))

        }
        const linepayTopup = async () => {
            const member = JSON.parse(localStorage.getItem('auth'))
            const response = await fetch(`${process.env.API_SERVER}/ecshop/checkout/linepaytopup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${member.token}`
                },
                body: JSON.stringify({
                    amount: addValue
                })
            })
            const data = await response.json()
            return data
        }
        try {
            const response = await linepayTopup()
            if (response.message === 'Order created successful!') {
                const redirect = () => response.linepay_redirect ? window.location.href = response.linepay_redirect : ''
                redirect()
            }
            else {
                throw new Error(response.error)
            }
        } catch (error) {
            console.log('error', error)

        }
    }

    console.log(addValue)
    const member = (
        <div className='d-flex mt-3 mb-3 align-items-center ms-3'>
            <div className='d-flex align-items-center w-100'>
                <div style={{ backgroundImage: `url(${process.env.API_SERVER}/img/member/${memberInfo.photo})`, width: 100, height: 100,backgroundRepeat:'no-repeat',backgroundSize:'cover',borderRadius:'50%',backgroundPosition:'center' }}>
                </div>

                <div className=' ms-5 fs-4 text-secondary' style={{ fontFamily: "Zen Maru Gothic", width: "20%" }} >錢包餘額 :</div>
                <div className='d-flex align-items-center'>
                    <Money1 src={Money.src} style={{ width: "40%" }} />
                    <div className='text-danger fs-3' style={{ fontFamily: "var(--ff2)" }}> {memberInfo.wallet}</div>
                </div>
            </div>
        </div>)
    return (
        <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='border border-2 border-secondary-subtle p-4 container rounded-5 mt-5' style={{ width: '50vw' }}>
                <div className='d-flex justify-content-center fs-2 mb-3 text-success' style={{ fontFamily: "Zen Maru Gothic" }}>會員錢包儲値</div>
                {member}
                <PaymentForCash payment={payment} setPayment={setPayment} />
                <CheckBox addValue={addValue} setAddValue={setAddValue} />
                <div className='d-flex'>
                    <Button variant="contained" className='w-25 d-flex align-items-center mx-auto p-1  bg-primary rounded-4 mt-4 mb-2 border-0 justify-content-center fs-4' style={{ fontFamily: "Zen Maru Gothic" }} onClick={() => backToMember()}>返回會員中心</Button>
                    <Button variant="contained" className='w-25 d-flex align-items-center mx-auto p-1  bg-warning rounded-4 mt-4 mb-2 border-0 justify-content-center fs-4' style={{ fontFamily: "Zen Maru Gothic" }} onClick={() => backToCheckout()}>返回結帳</Button>
                    <Button variant="contained" className='w-25 d-flex align-items-center mx-auto p-1   bg-danger rounded-4 mt-4 mb-2 border-0 justify-content-center fs-4' style={{ fontFamily: "Zen Maru Gothic" }} onClick={() => topUp()}>前往儲値</Button>
                </div>
            </div>
        </div>
    );
}
