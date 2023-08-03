import styled from '@emotion/styled'
import React, { useContext, useEffect } from 'react'
import { Cart } from '@/components/checkout/CheckOutFinal'
import { useRouter } from 'next/router'
const Page = styled.div`
    position:absolute;
    font-size:17px;
    text-align:center;
    width:8%;
    top: 2%;
    left: -8.1%;
`
const PageTag = styled.div`
    &:hover{
        background-color:#fff3ca;
        cursor:pointer;
    }
`
export default function CheckOutPage() {
    const {page, setPage} = useContext(Cart)
    const router = useRouter()
    const handlePage = (p) => {
        const query = {...router.query}
        if(p) query.page = p
        router.push({
            pathname: router.pathname,
            query: query
        }, undefined, { scroll : false })
    }
    useEffect(()=>{
        setPage(router.query.page || 'subscribe')
    },[router])
    
  return (
    <Page>
        <PageTag className={page === 'subscribe' ? 'border-top  border-start border-bottom rounded-3 border-secondary-subtle border-3 p-3 bg-warning':'border-top border-start border-bottom  border-3 border-secondary-subtle rounded-3 p-3'} onClick={()=>handlePage("subscribe")}>會員</PageTag>
        <PageTag className={page === 'buy' ? 'border-start border-bottom rounded-3 p-3 bg-warning border-secondary-subtle border-3':' border-3 border-secondary-subtle border-start border-bottom rounded-3 p-3'} onClick={()=>handlePage("buy")}>順路買買</PageTag>
        <PageTag className={page === 'order' ? 'border-start border-bottom rounded-3 p-3 bg-warning border-secondary-subtle border-3' : 'border-start border-3 border-secondary-subtle border-bottom rounded-3 p-3'} onClick={()=>handlePage("order")}>外帶</PageTag>
        <PageTag className={page === 'shop' ? 'border-start border-bottom rounded-3 p-3 bg-warning border-secondary-subtle border-3' : 'border-start border-3 border-secondary-subtle border-bottom rounded-3 p-3'} onClick={()=>handlePage("shop")}>美食商城</PageTag>
    </Page>
  )
}
