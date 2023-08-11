import styled from '@emotion/styled';
import React, { useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';
import Category from '@/components/shopmall/shopfilter/category';
import PriceRange from '@/components/shopmall/shopfilter/pricerange';
import Star from '@/components/shopmall/shopfilter/star';

const H3div = styled.div`
  font-size: var(--h3);
`;

export default function ShopFilter() {
  // const [RWD, setRWD] = useState(false)
  // const handleRWD = () => {
  //   setRWD(true)
  //}
  return (
    <>
      {/* <div className={`position-absolute d-flex align-items-center `} style={{top:"18%",left:"3%"}} onClick={handleRWD}>
      <PiFunnelLight  className='' style={{color:"#911010",fontWeight:"bolder",fontSize:"30px"}}/>
      <span style={{fontSize:"16px"}}>篩選器</span>
      </div> */}
    <div className='col-xl-2 pe-xl-5 col-6 d-none d-xl-block fw-bold'>
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
