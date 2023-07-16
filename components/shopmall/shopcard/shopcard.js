import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import cola from '@/public/trycheckoutimage/cola.webp'
import cookie from '@/public/trycheckoutimage/cookie.png'
import styled from '@emotion/styled'
import {AiFillStar} from 'react-icons/ai'
import {BsCartPlusFill} from 'react-icons/bs'
import { Host } from '@/components/shopmall/shopmallfinal';
export default function ShopCard() {
  const {host} = useContext(Host)
  const ShopCardContainer = styled.div`
  display: grid;
  grid-template-columns: 22% 22% 22% 22%;
  grid-gap: 2%;
  `;
  const ItemCard = styled.div`
    border: 4px solid var(--main-color);
    border-radius: 14px;
    background: #fff;
    width: 22%;
    padding: 0;
    margin-bottom: 3% ;
    overflow:hidden;
    &:hover  {
      transform: scale(1.02);
      transition: 0.2s ease-in-out infinite;
      
    }
  `
  const ImageCss = styled.img`
    border-radius: 14px 14px 0 0;
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
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/api/item`);
      const {data} = await response.json();
      setItems(data)
    };
  
    fetchData();
  }, []);
  const itemCardsMap = items.map(v =>
  <ItemCard className='h-100 object-fit-cover w-100 d-flex flex-column justify-content-between' key={v.item_id}>
    <div style={{height:"60%"}}>
      <ImageCss src={`${v.img_url}`} className='w-100'/>
      <div className='d-flex justify-content-between px-3 pt-2'>
        <Span16px>{v.item_name}</Span16px>
      </div>
    </div>
    <div>
      <div className='d-flex justify-content-end w-100 pe-3 mt-4'>
        <Span24px>${v.price}</Span24px>
      </div>
      <div className='d-flex justify-content-between px-3 pt-3 pb-2 align-items-center'>
        <div className='d-flex align-items-center'>
          <AiFillStar className='text-warning fs-4'/>
          <Span16px className='ms-2'>4.8 / 5</Span16px>
        </div>
        <Span16px>已售出100件</Span16px>
      </div>
    </div>
        <div className='w-100 px-3 mb-2'>
          <Button20px className='bg-warning w-100 h-100 border-0 rounded-3 d-flex justify-content-center align-items-center '>
          <BsCartPlusFill></BsCartPlusFill>
          <span className='ms-1'>加入購物車</span>
          </Button20px>
        </div>
  </ItemCard>
)
  
  return (
    <>
    <div >
        <ShopCardContainer className='ms-2  justify-content-evenly'>
          {itemCardsMap}
        </ShopCardContainer>
        
    </div>
    </>
  )
}
