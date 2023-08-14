import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Host } from '@/components/shopmall/shopmallfinal'
import { debounce } from 'lodash'
const H4div = styled.div`
    font-size:var(--h4)
`
const Input18px = styled.input`
    &:focus{
      outline:none
    }
    font-size:var(--h7);
    width:35%;
    padding: 0 8px;
    border: 1px solid var(--main-color);
    border-radius:8px;
    font-weight:900;
`
const Line = styled.span`
    width:15%;
`
const Button24px = styled.button`
    font-size:var(--h6);
    font-weight:900;
    line-height:32px
`

export default function PriceRange() {
  const { host, priceRange, dispatch, isReset } = useContext(Host);
  const [showError, setShowError] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const handleMaxInput = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(inputValue)) setMaxPrice(inputValue)

  };
  const handleMinInput = (event) => {
    const regex = /^[0-9]*$/;
    const inputValue = event.target.value;
    if (regex.test(inputValue)) setMinPrice(inputValue)
  };
  const router = useRouter();

  const handlePriceChange = () => {
    if (isReset) return
    if (parseInt(minPrice) > parseInt(maxPrice)) {
      setShowError(true)
      return
    } else setShowError(false)
    dispatch({
      type: 'SET_MAX_PRICE',
      payload: maxPrice
    })
    dispatch({
      type: 'SET_MIN_PRICE',
      payload: minPrice
    })
    const query = { ...router.query };

    if (minPrice !== '') {
      query.price_min = minPrice;
    } else {
        delete query.price_min;
    }

    if (maxPrice !== '') {
      query.price_max = maxPrice;
    } else {
        delete query.price_max;
    }

    router.push({
      pathname: router.pathname,
      query: query,
    }, undefined, { scroll: false });
  };
  useEffect(() => {
    setMaxPrice('')
    setMinPrice('')
  }, [isReset])
  return (
    <div className='border-bottom border-2 mt-3'>
      <H4div className='fs-5 mt-2'>價格範圍</H4div>
      <div className='d-flex position-relative justify-content-evenly mt-2 align-items-center'>
        <Input18px type='text' className='py-1' placeholder='$最小值' value={minPrice} onChange={handleMinInput}></Input18px>
        <Line className='border-bottom  border-2 border-dark-subtle h-25'></Line>
        <Input18px type='text' className='py-1' placeholder='$最大值' value={maxPrice} onChange={handleMaxInput}></Input18px>
      </div>
      {showError && <H4div className='text-danger d-flex justify-content-center mt-2 fs-5'>請輸入有效價格範圍</H4div>}
      <Button24px className='w-100 mt-3 mb-3  border-0 text-light rounded-2' style={{ backgroundColor: 'var(--main-color)' }} onClick={handlePriceChange}>套用</Button24px>
    </div>
  )
}
