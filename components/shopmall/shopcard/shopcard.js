import React, { useContext, useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {AiFillStar} from 'react-icons/ai'
import { Host } from '@/components/shopmall/shopmallfinal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import 'animate.css';
import Modal from '@mui/material/Modal';
import useLocalStorage from "@/components/hooks/useLocalStorage";
import {  AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

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
};
const Inputborder = styled.input`
  &:focus{
    outline:none
  }
`

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
      cursor:pointer
    }
  `
const ImageCss = styled.img`
    border-radius: 10px 10px 0 0;
    border-bottom:1px solid #adadad

  `
  const Span32px = styled.span`
    font-size:var(--h3)
  `
  const Span16px = styled.span`
  font-size:var(--h7);
  `
  const Span20px = styled.span`
  font-size:var(--h5);
  `
  const Button20px = styled.button`
  font-size:var(--h5)
  `


export default function ShopCard() {
  const {items, token} = useContext(Host);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [num, setNum] = useState(1)
  const [verify, setVerify] = useState(false)
  const [userCart, setUserCart] = useLocalStorage("shop",  {})
  useEffect(()=>{
    if(token === null) return
    if(token.token) setVerify(true)
  },[token])
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
      title: '請先登入會員',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      confirmButtonText: '前往登入',
      customClass: {
        confirmButton: 'bg-danger'
      }
    }).then(result => {
      if(result.isConfirmed){
        window.location.href = 'http://localhost:3000/login'
      }
    })
  }
  const handleCart = (item) =>{
    {verify === false && 
    <div style={{ zIndex: 9999 }}>
    {loginAlert()}
    </div>
    }
    setOpen(false)
    if(verify === false) return
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
  
  const remain = 10
  const itemCardsMap = items.map(v =>
  <ItemCard className="w-100 d-flex pb-3 flex-column justify-content-between mb-5" key={v.item_id} style={{zIndex:"1"}} onClick={()=>handleOpen(v)}>
      <div>
      <ImageCss src={v.img_url} className='w-100'/>
        <div className='px-3 mt-2'>
          <Span20px className=''>{v.item_name}</Span20px>
        </div>
      </div>
    <div className='w-100 mt-2'>
      <div>
          <div className='w-100 d-flex justify-content-end pe-3'>
              <Span32px className='text-danger'>${v.price}</Span32px>
          </div>
          <div className='d-flex justify-content-between px-3 mt-3'>
            <div className='d-flex align-items-center'>
                <AiFillStar className='text-warning fs-4'/>
                <Span16px className='ms-2'>{v.avg_rating.toFixed(1)} / 5</Span16px>
            </div>
            <Span16px>已售出 {v.sales}0 件</Span16px>
          </div>
      </div>
    </div>
  </ItemCard>  
)
  return (
    <>
    <div >
        <ShopCardContainer className=' justify-content-between pe-5'>
          {itemCardsMap}
          {selectedItem && <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={`container-fulid `}
          >
            <Box sx={style} className='d-flex row'>
              <div className='col-7 h-100 overflow-hidden object-fit-cover'>
                <img src={selectedItem.img_url} className='w-100 h-100' ></img>
              </div>
              <div className='col-5 h-100'>
                <Typography id="modal-modal-title" variant="h4" component="h2" className='h-100 d-flex flex-column justify-content-between pt-3 ' style={{fontSize:"32px"}}>
                  <div>
                    {selectedItem.item_name}
                  </div>
                  <div className='d-flex justify-content-between '>
                    <div className='fs-3 text-danger'>售價: {selectedItem.price}</div>
                  </div>
                  <div className='d-flex flex-column justify-content-between'>
                    <div className='d-flex w-100 flex-column align-items-end fs-5 h-100'>
                      <div>廠商: {selectedItem.factory_name}</div>
                      <div>庫存: {remain} 件</div>
                    </div>
                    <div>
                      <div className='w-75 d-flex align-items-center mx-auto border border-secondary border-2 justify-content-center mt-1 rounded-5 mb-4 position-relative'>
                        <Button variant="text" className='p-0 h-100 rounded-start-5 text-danger' onClick={minus}>
                          <AiOutlineMinus className='fs-1 p-1'/>
                        </Button>
                        <Inputborder className='w-50 fs-3 border-0 text-center mx-5' value={num} readOnly></Inputborder>
                        <Button variant="text" className='p-0 rounded-end-5 text-danger' onClick={plus}>
                          <AiOutlinePlus className='fs-1 p-1'/>
                        </Button>
                      </div>
                      <Button variant="text" className='border-0 rounded-3 w-100 text-light fs-3' style={{background:"#911010"}} onClick={()=>handleCart(selectedItem)}>加入購物車</Button>
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
