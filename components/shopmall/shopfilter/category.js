import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import { Host } from '@/components/shopmall/shopmallfinal';
import { FiArrowDown } from 'react-icons/fi';

const H4div = styled.div`
  font-size: var(--h4);
`;

const H5span = styled.span`
  font-size: var(--h5);
`;

export default function Category() {
  const { host, categories, dispatch, setSelectedCategory, selectedCategory, isReset} = useContext(Host);
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [initCate, setInitCate] = useState([])
  const handleChange = (event) => {
    // console.log('check change')
    const { value, checked } = event.target;
    dispatch({
      type: 'SET_CATEGORIES',
      payload: {
        ...categories,
        [value]: {
          ...categories[value],
          checked: checked
        }
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/ecshop/category`);
      const { data } = await response.json();
      const initialCategories = data.reduce((acc, curr) => {
        const { cate_id, cate_name } = curr;
        acc[cate_id] = {
          cate_name: cate_name,
          checked: false,
        };
        return acc;
      }, {});
      // console.log('set cate init')
      setInitCate(initialCategories)
      dispatch({
        type: 'SET_CATEGORIES',
        payload: initialCategories,
      });
      
    };
    fetchData();
  }, []);
  useEffect(()=>{
    isReset &&  dispatch({
      type: 'SET_CATEGORIES',
      payload: initCate
    });
    setSelectedCategory([]);
    // console.log(`reset all ${selectedCategory}`)
  },[isReset])

  useEffect(() => {
    if(isReset) return
    const selectedCategoryIds = Object.keys(categories).filter((key) => categories[key].checked);
    setSelectedCategory(selectedCategoryIds)
    const query = { ...router.query };
    if (selectedCategoryIds.length > 0) {
      query.cate_ids = selectedCategoryIds.join('%');
      query.page = 1
    }else{
      delete query.cate_ids;
    }
    router.push({
      pathname: router.pathname,
      search: new URLSearchParams(query).toString(),
    }, undefined, { scroll: false });
    // console.log('set query')
  }, [categories]);

  const displayedCategories = showAll ? Object.entries(categories) : Object.entries(categories).slice(0, 5);

  return (
    <div className='border-bottom border-2 overflow-hidden'>
      <H4div className='mt-3 fs-5'>分類</H4div>
      {/* {console.log(selectedCategory)} */}
      <div className='d-flex w-100 mt-1 flex-column align-items-start '>
        {displayedCategories.map(([key, value]) => (
          <label key={key} style={{ cursor: 'pointer' }} className='d-flex align-items-center'>
            <Checkbox
              checked={value.checked}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
              onChange={handleChange}
              value={key}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <H5span className='fs-6'>{value.cate_name}</H5span>
          </label>
        ))}
      </div>
      {!showAll && Object.entries(categories).length > 5 && (
        <H5span className='d-flex justify-content-center mb-3 text-dark align-items-center' style={{ cursor: 'pointer' }} onClick={() => setShowAll(true)}>
          <H5span className='fs-6' style={{color:'var(--main-color)'}}>查看更多</H5span>
          <FiArrowDown style={{color:'var(--main-color)'}}/>
        </H5span>
      )}
    </div>
  );
}
