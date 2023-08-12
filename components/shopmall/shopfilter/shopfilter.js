import styled from '@emotion/styled';
import React, { useContext} from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import Category from '@/components/shopmall/shopfilter/category';
import PriceRange from '@/components/shopmall/shopfilter/pricerange';
import Star from '@/components/shopmall/shopfilter/star';
import { Host } from '@/components/shopmall/shopmallfinal'
const H3div = styled.div`
  font-size: var(--h3);
`;

export default function ShopFilter() {
  const { RWD } = useContext(Host)
  return (
    <>
    <div className={`col-xl-2 pe-xl-5 col-12 d-xl-block fw-bold ${RWD ? 'd-block' : 'd-none'}`}>
      <H3div>
        <PiFunnelLight className='me-xl-2' style={{color:'var(--main-color)'}}/>
        <span className='fs-4 fw-bold' style={{color:'var(--main-color)'}}>條件篩選</span>
      </H3div>
      <Category />
      <PriceRange />
      <Star />
    </div>
    </>
  );
}
