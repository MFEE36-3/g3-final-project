import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {RxCross2} from "react-icons/rx"
import { useRouter } from 'next/router';
const H2div = styled.div`
    font-size:var(--h2)
`
const H4div = styled.div`
    font-size:var(--h4)
`
const H4buttondiv = styled.div`
    font-size:var(--h4);
    background:var(--main-color);
    width:20%
`
const Colorbutton = styled.button`
    background:var(--main-color)
`
const filterButton = () => {
    return(
    <>
        <H4buttondiv className='d-flex rounded-3 justify-content-evenly ps-3 mb-5 align-items-center' >
            <div className='my-4 text-light'>{"價格: $300 - $500"}</div>
            <Colorbutton className='border-0 rounded-3 text-light' onClick={()=> {
              
            }}>
                <RxCross2/>
            </Colorbutton>
        </H4buttondiv>
    </>
    )
}
export default function ShopSearchTitle() {
    const router = useRouter();
    const [sort, setSort] = useState()
    const [order, setOrder] = useState()
    const handleChange = (event) => {
    let selectedSort = event.target.value;
    if(selectedSort === 'priceAsc'){
      setSort("price");
      setOrder("asc")
    }else if (selectedSort === 'priceDesc'){
      setSort("price");
      setOrder("desc")
    }else{
      setSort(selectedSort);
      setOrder('')
    }
    
  };
  useEffect(()=>{
    let query = { ...router.query }
    if(sort){
      query.sortBy = sort
    }
    if(order){
      query.order = order
    }
    router.push({
      pathname: router.pathname,
      search:`?${new URLSearchParams(query).toString()}`
    })
  },[sort, order])
  return (
    <div className='ms-4'>
        <H2div >餅乾</H2div>
        <div className='mt-3 mb-4 d-flex justify-content-between align-items-center'>
        <H4div >找到了{2}項商品</H4div>
        <Box sx={{ minWidth: 150 }} className="me-5 border-3">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className='d-flex align-items-center'>排序</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="sort"
          onChange={handleChange}
        >
          <MenuItem value={"ctime"}>最新</MenuItem>
          <MenuItem value={"priceAsc"}>價格由低至高</MenuItem>
          <MenuItem value={"priceDesc"}>價格由高至低</MenuItem>
          <MenuItem value={"sales"}>最熱銷</MenuItem>
        </Select>
      </FormControl>
    </Box>
    {console.log(sort)}
    {console.log(order)}
        </div>
        {filterButton()}
    </div>
  )
}
