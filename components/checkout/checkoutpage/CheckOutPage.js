import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { Cart } from '@/pages/checkout/CheckOut'

const Page = styled.div`
    position:absolute;
    top: 0%;
    left: -5.1%;
`
const PageTag = styled.div`
    &:hover{
        background-color:#fff3cd;
    }
`
export default function CheckOutPage() {
    const {page, setPage} = useContext(Cart)
    const handlePage = (page) => {
        setPage(page)
    }
  return (
    <Page>
        <PageTag className={page === 'subscribe' ? 'border-top border-start border-bottom rounded-3 p-3 bg-warning':'border-top border-start border-bottom rounded-3 p-3'} onClick={()=>handlePage("subscribe")}>訂閱</PageTag>
        <PageTag className={page === 'buy' ? 'border-top border-start border-bottom rounded-3 p-3 bg-warning':'border-top border-start border-bottom rounded-3 p-3'} onClick={()=>handlePage("buy")}>買買</PageTag>
        <PageTag className={page === 'order' ? 'border-start border-bottom rounded-3 p-3 bg-warning' : 'border-start border-bottom rounded-3 p-3'} onClick={()=>handlePage("order")}>外帶</PageTag>
        <PageTag className={page === 'shop' ? 'border-start border-bottom rounded-3 p-3 bg-warning' : 'border-start border-bottom rounded-3 p-3'} onClick={()=>handlePage("shop")}>商城</PageTag>
    </Page>
  )
}
