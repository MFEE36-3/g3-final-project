import React from 'react'
import Image from 'next/image'
import cola from '@/public/trycheckoutimage/cola.webp'
import cookie from '@/public/trycheckoutimage/cookie.png'
import styled from '@emotion/styled'
import {AiFillStar} from 'react-icons/ai'
export default function ShopCard() {
  const ItemCard = styled.div`
    border: 5px solid var(--main-color);
    border-radius: 14px;
    background: #fff;
    width: 22%;
    padding: 0;
    margin-bottom: 3% ;
    overflow:hidden;
    &:hover  {
      transform: scale(1.05);
      transition: 0.4s ease-in;
    }
  `
  const ImageCss = styled.img`
    border-radius: 14px 14px 0 0;
  `
  const handleImageScale = styled.div`
    
  `
  const Span24px = styled.span`
    font-size:var(--h4)
  `
  const Span16px = styled.span`
  font-size:var(--h7)
`
  return (
    <>
     <div className='col-9'>
        <div className='row ms-2 d-flex justify-content-between'>
          <ItemCard className='h-25 object-fit-cover'>
              <ImageCss src={cookie.src} className='w-100'/>
            <div className='d-flex justify-content-between px-3 pt-2 '>
              <Span24px>商品名稱</Span24px>
              <Span24px>＄價格</Span24px>
            </div>
            <div className='d-flex justify-content-between px-3 pt-3 pb-2 align-items-center'>
            <div className='d-flex align-items-center'>
              <AiFillStar className='text-warning fs-4'/>
              <Span16px className='ms-2'>4.8 / 5</Span16px>
            </div>
            <Span16px>已售出100件</Span16px>
            </div>
          </ItemCard>
          <ItemCard className='h-25 object-fit-cover'>
              <ImageCss src={cookie.src} className='w-100'/>
            <div className='d-flex justify-content-between px-3 pt-2 '>
              <Span24px>商品名稱</Span24px>
              <Span24px>＄價格</Span24px>
            </div>
            <div className='d-flex justify-content-between px-3 pt-3 pb-2 align-items-center'>
            <div className='d-flex align-items-center'>
              <AiFillStar className='text-warning fs-4'/>
              <Span16px className='ms-2'>4.8 / 5</Span16px>
            </div>
            <Span16px>已售出100件</Span16px>
            </div>
          </ItemCard>
          <ItemCard className='h-25 object-fit-cover'>
              <ImageCss src={cookie.src} className='w-100'/>
            <div className='d-flex justify-content-between px-3 pt-2 '>
              <Span24px>商品名稱</Span24px>
              <Span24px>＄價格</Span24px>
            </div>
            <div className='d-flex justify-content-between px-3 pt-3 pb-2 align-items-center'>
            <div className='d-flex align-items-center'>
              <AiFillStar className='text-warning fs-4'/>
              <Span16px className='ms-2'>4.8 / 5</Span16px>
            </div>
            <Span16px>已售出100件</Span16px>
            </div>
          </ItemCard>
          <ItemCard className='h-25 object-fit-cover'>
              <ImageCss src={cookie.src} className='w-100'/>
            <div className='d-flex justify-content-between px-3 pt-2 '>
              <Span24px>商品名稱</Span24px>
              <Span24px>＄價格</Span24px>
            </div>
            <div className='d-flex justify-content-between px-3 pt-3 pb-2 align-items-center'>
            <div className='d-flex align-items-center'>
              <AiFillStar className='text-warning fs-4'/>
              <Span16px className='ms-2'>4.8 / 5</Span16px>
            </div>
            <Span16px>已售出100件</Span16px>
            </div>
          </ItemCard>
          
        </div>
    </div>
    </>
  )
}
