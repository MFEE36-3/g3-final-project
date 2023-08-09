import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Okicon from '@/public/trycheckoutimage/ok.png'
import { useRouter } from 'next/router'

export default function FinishCheckout() {
    const [member, setMember] = useState({})
    const FontDiv = styled.div`
    font-family: var(--ff3);
    `
    const [time, setTime] = useState(5);
    const router = useRouter()
    useEffect(() => {
        const member = localStorage.getItem('auth')
        setMember(JSON.parse(member))
        const timeoutPush = setTimeout(()=>{
            router.push('/member')
        },5000)
        const interval = setInterval(() => {
          setTime(prevTime => {
            if(prevTime === 1) {
                clearInterval(interval)
            }
            return prevTime - 1
          });
        }, 1000);

        return () => {
          clearInterval(interval);
          clearTimeout(timeoutPush);
        };
      }, []);
  return (
    <>
      {!member ? <div className='d-flex justify-content-center align-items-center w-100 h-100'>這裡不是你該來的地方888888</div> : <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
            <div className='w-50 h-50 border rounded-3 border-5 '>
                <div className='d-flex h-75 flex-column justify-content-center align-items-center mt-1'>
                    <img src={Okicon.src} className="w-25"></img>
                    <FontDiv className='fs-1 mt-1'>付款完成</FontDiv>
                    <div className='d-flex flex-column'>
                      <div className='fs-5 mt-2'>商品內容請到 會員中心 - 我的活動 查詢</div>
                      <div className='fs-5 mt-2'>儲值紀錄請到 會員中心 - 我的錢包 查詢</div>
                    </div>

                </div>
                <div className='d-flex justify-content-center mt-2'>
                    <button className='w-50 fs-5 p-2 border-0 rounded-4 d-flex justify-content-center bg-success-subtle' onClick={()=>{
                      router.push('/member')
                    }}>{time} 秒後回到會員頁面</button>
                </div>
            </div>
        </div>}    
        
    </>
  )
}

