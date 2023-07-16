import styled from '@emotion/styled'
import React, { useContext, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Host } from '@/components/shopmall/shopmallfinal';
const H4div = styled.div`
      font-size:var(--h4)
`
const H5span = styled.span`
      font-size:var(--h5)
`
export default function Category() {
    const {host} = useContext(Host);
    const [categories, setCategories] = useState({});
    
      const handleChange = (event) => {
        const { value, checked } = event.target;
        setCategories((prevState) => ({
          ...prevState,
          [value]: {
            ...prevState[value],
            checked: checked
          }
        }));
      };
    const router = useRouter();
    useEffect(()=>{
        const selectedCategoryIds = Object.keys(categories).filter(key=> categories[key].checked);
        const query = {...router.query}
        if(selectedCategoryIds.length > 0){
            query.cate = selectedCategoryIds.join("%")
        }
        router.push({
            pathname:router.pathname,
            search:`${new URLSearchParams(query).toString()}`
        })
    },[categories])
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`${host}/api/category`);
        const {data} = await response.json();
        const initialCategories = data.reduce((acc, curr) => {
          const {cate_id, cate_name} = curr
          acc[cate_id] = {
            cate_name: cate_name,
            checked: false,
          };
          return acc;
        }, {});
        setCategories(initialCategories);
      };
    
      fetchData();
    }, []);
  return (
    <div className='border-bottom border-2 '>
        <H4div className='mt-3'>分類</H4div>
        <div className='d-flex w-100 mt-4 flex-column align-items-start mb-4'>
        {Object.entries(categories).map(([key, value]) => 
          <label style={{cursor:"pointer"}}>
          <Checkbox
            checked={value.checked}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            onChange={handleChange}
            value={key}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <H5span>{value.cate_name}</H5span>
        </label>
        )}
      </div>
    </div>
  )
}
