import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Host } from '@/components/shopmall/shopmallfinal'
import { useRouter } from 'next/router';
const H2div = styled.div`
    font-size:var(--h2);
    @media (max-width: 576px) {
    font-size:25px
  }
`
const H4div = styled.div`
    font-size:var(--h4)
`
const mui_select_style = {
  '&:hover .MuiOutlinedInput-notchedOutline': {
      backgroundColor: 'rgba(250,179,179,0.2)',
      borderColor: '#FAB3B3'
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--main-color) !important',
  },
}

export default function ShopSearchTitle() {
    const {sortby, order, keyword, dispatch, items, isReset, totalpages} = useContext(Host)
    const [orders, setOrders] = useState('')
    const router = useRouter();
    const handleChange = (event) => {
    let selectedSort = event.target.value;
    setOrders(selectedSort)
    if (selectedSort === 'priceAsc') {
      dispatch({ type: 'SET_SORTBY', payload: 'price' });
      dispatch({ type: 'SET_ORDER', payload: 'asc' });
    } else if (selectedSort === 'priceDesc') {
      dispatch({ type: 'SET_SORTBY', payload: 'price' });
      dispatch({ type: 'SET_ORDER', payload: 'desc' });
    } else if (selectedSort === 'ctime') {
      dispatch({ type: 'SET_SORTBY', payload: 'created_at' });
      dispatch({ type: 'SET_ORDER', payload: 'desc' });
    } else if (selectedSort === 'sales') {
      dispatch({ type: 'SET_SORTBY', payload: 'sales' });
      dispatch({ type: 'SET_ORDER', payload: 'desc' });
    }
  };
  useEffect(()=>{
    if(isReset) return
    let query = { ...router.query }
    if(sortby){
      query.order_key = sortby
    }
    if(order){
      query.order_type = order
    }
    router.push({
      pathname: router.pathname,
      search:`?${new URLSearchParams(query).toString()}`
    }, undefined, {scroll:false})
  },[sortby, order])
  useEffect(()=>{
    setOrders('')
  },[isReset])
  return (
    <div className=''>
        <H2div className='text-danger'>{keyword}</H2div>
        <div className='mt-3 w-100 mb-xl-4 d-flex justify-content-between align-items-center'>
        {keyword && <div></div>}
        {!keyword && <>
        <div></div>
        </>}
        <Box sx={{ minWidth: 120 }} className="me-xl-5 border-3">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className='d-flex align-items-center' sx={{color:'var(--main-color)',fontWeight:900,'&.MuiInputLabel-root.Mui-focused':{color:'var(--main-color)'}}}>排序</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orders}
          label="sort"
          sx={mui_select_style}
          onChange={handleChange}
        >
          <MenuItem value={"ctime"}>最新</MenuItem>
          <MenuItem value={"priceAsc"}>價格由低至高</MenuItem>
          <MenuItem value={"priceDesc"}>價格由高至低</MenuItem>
          <MenuItem value={"sales"}>最熱銷</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div>
    </div>
  )
}