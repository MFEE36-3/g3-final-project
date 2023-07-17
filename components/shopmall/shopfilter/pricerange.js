import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import {Host} from '@/components/shopmall/shopmallfinal'

const H4div = styled.div`
    font-size:var(--h4)
`
const Input18px = styled.input`
    &:focus{
      outline:none
    }
    font-size:var(--h5);
    width:35%;
`
const Line = styled.span`
    width:15%;
`
const Button24px = styled.button`
    font-size:var(--h4)
`
export default function PriceRange() {
    const {minPrice, setMinPrice, maxPrice, setMaxPrice} = useContext(Host)
    const [showError,setShowError] = useState(false)
    const handleMaxInput = (event) => {
        const inputValue = event.target.value;
        const regex = /^[0-9]*$/;
        if(regex.test(inputValue)){
            setMaxPrice(inputValue)
        }
      };
    const handleMinInput = (event) => {
        const inputValue = event.target.value;
        const regex = /^[0-9]*$/;
        if(regex.test(inputValue)){
            setMinPrice(inputValue)
        }
      };
    const router = useRouter();
    
    const handlePriceChange = () => {
        if(parseInt(minPrice) > parseInt(maxPrice)) {
            setShowError(true) 
            return
        }
        const query = {...router.query};
    
        if (minPrice !== '') {
          query.minprice = minPrice;
        }
    
        if (maxPrice !== '') {
          query.maxprice = maxPrice;
        }
    
        router.push({
          pathname: router.pathname,
          query: query,
        });
      };
  return (
    <div className='border-bottom border-2 mt-4'>
        <H4div>價格範圍</H4div>
        <div className='d-flex position-relative justify-content-evenly mt-4 align-items-center'>
            <Input18px type='text' className='px-2' placeholder='$最小值' value={minPrice} onChange={handleMinInput}></Input18px>
            <Line className='border-bottom  border-2 border-dark-subtle h-25'></Line>
            <Input18px type='text' className='px-2 ' placeholder='$最大值' value={maxPrice} onChange={handleMaxInput}></Input18px>
        </div>
        {showError &&<H4div className='text-danger d-flex justify-content-center mt-3'>請輸入有效價格範圍</H4div>}
        <Button24px className='w-100 mt-5 mb-4  border-0 bg-danger text-light rounded-2' onClick={handlePriceChange}>套用</Button24px>
    </div>
  )
}
