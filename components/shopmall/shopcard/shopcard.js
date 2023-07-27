import React, { useContext, useEffect, useState, useReducer} from 'react'
import styled from '@emotion/styled'
import {AiFillStar} from 'react-icons/ai'
import {BsCartPlusFill} from 'react-icons/bs'
import { Host } from '@/components/shopmall/shopmallfinal';
const ShopCardContainer = styled.div`
  display: grid;
  grid-template-columns: 22% 22% 22% 22%;
  `;
  const ItemCard = styled.div`
    border: 4px solid var(--main-color);
    border-radius: 14px;
    background: #fff;
    padding: 0;
    margin-bottom: 3% ;
    overflow:hidden;
    &:hover  {
      transform: scale(1.02);
      transition: 0.2s ease-in-out infinite;
      
    }
  `
const ImageCss = styled.img`
    border-radius: 10px 10px 0 0;
    border-bottom:1px solid #adadad

  `
  const Span24px = styled.span`
    font-size:var(--h4)
  `
  const Span16px = styled.span`
  font-size:var(--h7);

  `
  const Button20px = styled.button`
  font-size:var(--h5)
  `
export default function ShopCard() {
  const {items} = useContext(Host);
  const itemCardsMap = items.map(v =>
  <ItemCard className='w-100 d-flex flex-column justify-content-between mb-5' key={v.item_id}>
      <div>
      <ImageCss src={v.img_url} className='w-100'/>
        <div className='px-3 mt-2'>
          <Span16px className=''>{v.item_name}</Span16px>
        </div>
      </div>
    <div className='w-100 mt-2'>
      <div>
          <div className='w-100 d-flex justify-content-end pe-3'>
              <Span24px className='text-danger'>${v.price}</Span24px>
          </div>
          <div className='d-flex justify-content-between px-3'>
            <div className='d-flex align-items-center'>
                <AiFillStar className='text-warning fs-4'/>
                <Span16px className='ms-2'>{v.avg_rating.toFixed(1)} / 5</Span16px>
            </div>
            <Span16px>已售出 {v.sales}0 件</Span16px>
          </div>
      </div>
      <div className='px-3 my-3'>
        <Button20px className='bg-warning w-100 h-25 border-0 rounded-3 d-flex justify-content-center align-items-center'>
          <BsCartPlusFill></BsCartPlusFill>
          <span className='ms-1'>加入購物車</span>
        </Button20px>
      </div>
    </div>
  </ItemCard>
)
  
  return (
    <>
    <div >
        <ShopCardContainer className=' justify-content-evenly'>
          {itemCardsMap}
        </ShopCardContainer>
    </div>
    </>
  )
}