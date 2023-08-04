import styled from '@emotion/styled'
import React from 'react'
import {PiFunnelLight} from 'react-icons/pi'
import Category from '@/components/shopmall/shopfilter/category'
import PriceRange from '@/components/shopmall/shopfilter/pricerange'
import Star from '@/components/shopmall/shopfilter/star'
import Link from 'next/link'
const H3div = styled.div`
      font-size:var(--h3)
`

export default function ShopFilter() {
  
  return (
    <div className='col-2 pe-5 '>
      <H3div>
        <PiFunnelLight className='me-2' />
        <span>條件篩選</span>
      </H3div>
      <Category/>
      <PriceRange/>
      <Star/>
    </div>
  );
}
