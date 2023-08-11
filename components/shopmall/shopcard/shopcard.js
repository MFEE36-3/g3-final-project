import React, { useContext, useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {AiFillStar} from 'react-icons/ai'
import { Host } from '@/components/shopmall/shopmallfinal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import 'animate.css';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import useLocalStorage from "@/components/hooks/useLocalStorage";
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import {  AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router';
import filled_walkbag_middle from '@/public/main_page/filled_walkbag_middle.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height:'50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
'@media (max-width: 576px)': {
    width: '100%',
    height: '35%',
    p: 1,
  },  
};
const Fs13pxdiv = styled.div`
  @media (max-width: 576px) {
    font-size:13px
  }
`
const ModalDiv = styled.div`
  width:75%;
  @media (max-width: 576px) {
    width:100%
  }
`
const Fs16pxdiv = styled.div`
  @media (max-width: 576px) {
    font-size:14px
  }
`
const Fs20pxdiv = styled.div`
  font-size: 30px;
  @media (max-width: 576px) {
    font-size:20px;
    font-weight:bolder
  }
`
const Inputborder = styled.input`
  font-size:24px;
  @media (max-width: 576px) {
    font-size:16px;
  }
  &:focus{
    outline:none
  };
  
`
const StyleButton = styled(Button)`
  font-size: 24px;
  @media (max-width: 576px) {
    font-size:16px;
  }
`
const ShopCardContainer = styled.div`
  display: grid;
  grid-template-columns: 21% 21% 21% 21%;
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
      cursor:pointer
    }
    @media (max-width: 576px) {
    grid-column: span 2;
  }

  @media (min-width: 576px) and (max-width: 992px) {
    grid-column: span 3;
  }
  `
const ImageCss = styled.img`
    border-radius: 10px 10px 0 0;
    border-bottom:1px solid #adadad

  `
  const Span32px = styled.span`
    font-size:var(--h3);
    @media (max-width: 576px) {
    font-size:20px
  }
  `
  const Span16px = styled.span`
  font-size:var(--h7);
  @media (max-width: 576px) {
    font-size:12px
  }
  `
  const Span20px = styled.span`
  font-size:var(--h5);
  @media (max-width: 576px) {
    font-size:14px
  }
  `
  const Button20px = styled.button`
  font-size:var(--h5)
  `


export default function ShopCard() {
  const {items} = useContext(Host);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [num, setNum] = useState(1)
  const [userCart, setUserCart] = useLocalStorage("shop",  {})
  const router = useRouter()
  const handleOpen = (item) => {
    setSelectedItem(item)
    setOpen(true)
    setNum(1)
  };
  const handleClose = () => setOpen(false);
  const plus = () => {
    num <  remain && setNum(prev => prev +1)
  }
  const minus = () => {
    num > 1 && setNum(prev => prev - 1)
  }
  const loginAlert = () => {
    Swal.fire({
      title: '請先登入',
      iconHtml: `<img src=${chocoCookie.src}>`,
      customClass: {
          icon: 'sweetalert_icon'
        },
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '前往登入',
      denyButtonText: '我再想想',
  }).then(
      function (result) {
          if (result.value) router.push('/login')
      });
  return;
  }
  const handleCart = (item) =>{
    const member = JSON.parse(localStorage.getItem('auth'))
    {!member?.token && 
    <div style={{ zIndex: 9999 }}>
    {loginAlert()}
    </div>
    }
    setOpen(false)
    if(!member?.token) return
    const itemInfo = {
      itemId:item.item_id,
      itemName: item.item_name,
      src: item.img_url,
      price: item.price,
      amount: num,
    };
    const newItemAmount = (userCart[item.item_id]?.amount || 0) + num;
    setUserCart({
      ...userCart,
      [item.item_id]: {
        ...itemInfo,
        amount: newItemAmount,
      }
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: '商品已成功加入購物車囉'
    })
  }
  
  const remain = 1000
  const itemCardsMap = items.map(v =>
  <ItemCard className="w-100 d-flex pb-xl-3 flex-column justify-content-between mb-5" key={v.item_id} style={{zIndex:"1"}} onClick={()=>handleOpen(v)}>
      <div>
      <ImageCss src={v.img_url} className='w-100'/>
        <div className='px-3 mt-2'>
          <Span20px>{v.item_name}</Span20px>
        </div>
      </div>
    <div className='w-100 mt-2'>
      <div>
          <div className='w-100 d-flex justify-content-end pe-xl-3 pe-1'>
              <Span32px className='text-danger'>${v.price}</Span32px>
          </div>
          <div className='d-flex justify-content-between px-xl-3 px-1 mt-3 align-items-center'>
            <div className='d-flex align-items-center'>
                <AiFillStar className='text-warning fs-4'/>
                <Span16px className='ms-2'>{v.avg_rating.toFixed(1)} / 5</Span16px>
            </div>
            <Span16px>已售出 {v.sales}00 件</Span16px>
          </div>
      </div>
    </div>
  </ItemCard>  
)
  return (
    <>
    <div >
        <ShopCardContainer className='justify-content-evenly pe-xl-5 position-relative'>
          {items.length === 0 && <>
            <div className="position-absolute d-flex flex-column justify-content-center align-items-center" style={{top:"50%", left:"32%"}}>
              <Image src={filled_walkbag_middle} className="" 
              alt='filled_walkbag_middle' />
              <p className="fs-2 mt-4 ms-5">無此分類商品！</p>
            </div>
          </>}
          {itemCardsMap}
          {selectedItem && <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={`container-fulid `}
          >
            <Box sx={style} className='d-flex container-fulid'>
              <div className='col-xl-7 col-6 h-100 overflow-hidden object-fit-cover'>
                <img src={selectedItem.img_url} className='w-xl-100 h-100 w-100 object-fit-contain' ></img>
              </div>
              <div className='col-xl-5 col-6 h-100'>
                <Typography id="modal-modal-title" variant="h4" component="h2" className='h-100 d-flex flex-column justify-content-between pt-3 fs-2' >
                  <Fs20pxdiv>
                    {selectedItem.item_name}
                  </Fs20pxdiv>
                  <div className='d-flex justify-content-between '>
                    <Fs16pxdiv className=' text-danger'>售價: {selectedItem.price}</Fs16pxdiv>
                  </div>
                  <div className='d-flex flex-column justify-content-between'>
                    <Fs13pxdiv className='d-flex w-100 flex-column align-items-end mb-2 fs-5 mb-xl-1 h-100'>
                      <Fs13pxdiv>廠商:{selectedItem.factory_name}</Fs13pxdiv>
                      <Fs13pxdiv>庫存: {remain} 件</Fs13pxdiv>
                    </Fs13pxdiv>
                    <div className=''>
                      <ModalDiv className='d-flex align-items-center mx-auto border border-secondary border-2 justify-content-center mt-xl-1  rounded-5 mb-xl-4 mb-2 position-relative'>
                        <Button variant="text" className='p-0 h-100 rounded-start-5 text-danger' onClick={minus}>
                          <AiOutlineMinus className='fs-3  p-xl-1'/>
                        </Button>
                        <Inputborder className=' w-25 border-0 text-center mx-1 mx-xl-5' value={num} readOnly></Inputborder>
                        <Button variant="text" className='p-0 rounded-end-5 text-danger' onClick={plus}>
                          <AiOutlinePlus className='fs-3 p-xl-1'/>
                        </Button>
                      </ModalDiv>
                      <StyleButton variant="text" className='border-0 rounded-3 w-100 w-50  d-flex justify-content-center  text-light' style={{background:"#911010"}} onClick={()=>handleCart(selectedItem)}>加入購物車</StyleButton>
                    </div>
                  </div>
                </Typography>
              </div>
            </Box>
          </Modal>}
        </ShopCardContainer>
    </div>
    </>
  )
}
