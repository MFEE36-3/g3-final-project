import styled from '@emotion/styled'
import React, {useContext, useEffect, useReducer, useState} from 'react';
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
  const { host, categories, dispatch } = useContext(Host);
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(true);
  };


  const handleChange = (event) => {
    const { value, checked } = event.target;
    dispatch({
      type: 'SET_CATEGORIES',
      payload: {...categories,
      [value]: {
        ...categories[value],
        checked: checked}
      },
    });
  };

  useEffect(() => {
    const selectedCategoryIds = Object.keys(categories).filter((key) => categories[key].checked);
    const query = { ...router.query };
    if (selectedCategoryIds.length > 0) {
      query.cate = selectedCategoryIds.join('%');
    }
    router.push({
      pathname: router.pathname,
      search: new URLSearchParams(query).toString(),
    });
  }, [categories]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${host}/api/category`);
      const { data } = await response.json();
      const initialCategories = data.reduce((acc, curr) => {
        const { cate_id, cate_name } = curr;
        acc[cate_id] = {
          cate_name: cate_name,
          checked: false,
        };
        return acc;
      },{});
      dispatch({
        type: 'SET_CATEGORIES',
        payload: initialCategories,
      });
    };

    fetchData();
  }, []);

  const displayedCategories = showAll ? Object.entries(categories) : Object.entries(categories).slice(0, 5);

  return (
    <div className='border-bottom border-2 overflow-hidden'>
      <H4div className='mt-3'>分類</H4div>
      <div className='d-flex w-100 mt-4 flex-column align-items-start '>
        {displayedCategories.map(([key, value]) => (
          <label style={{ cursor: 'pointer' }}>
            <Checkbox
              checked={value.checked}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              onChange={handleChange}
              value={key}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <H5span>{value.cate_name}</H5span>
          </label>
        ))}
      </div>
      {!showAll && Object.entries(categories).length > 5 && (
        <H5span className='d-flex justify-content-center mb-3 text-dark align-items-center' style={{ cursor: 'pointer' }} onClick={handleShowAll}>
          <H5span>查看更多</H5span>
          <FiArrowDown />
        </H5span>
      )}
    </div>
  );
}
