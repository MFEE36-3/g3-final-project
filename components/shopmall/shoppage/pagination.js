import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Host } from '@/components/shopmall/shopmallfinal'
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
export default function ShopPagination() {
  const theme = useTheme();
  const {page, dispatch, totalPages, isReset} = React.useContext(Host);
  const router = useRouter()
  const handlePageChange = (event, page) => {
    dispatch({
      type:'SET_PAGE',
      payload: page,
    })
    const query = {...router.query}
    if(page) {
      query.page = page
    }
    router.push({
      pathname:router.pathname,
      query:query
    },undefined, {scroll:false})
  }



  return (
    <div className='w-100 d-flex justify-content-center mb-5 pb-5 mt-2'>
      <Stack spacing={1}>
        <Pagination count={totalPages} sx={{ '& .MuiPaginationItem-root': {
              fontSize: 14,
              [theme.breakpoints.up('lg')]: {
              fontSize: 18,
            },
            },
            '& .Mui-selected': {
              fontSize: 14,
              [theme.breakpoints.up('lg')]: {
              fontSize: 20,
            },
            },
            '& .MuiPaginationItem-page': {
              minWidth: '38px',
              padding: '7px',
            },
             }}
             onChange={handlePageChange} 
             />
      </Stack>
    </div>
  );
}