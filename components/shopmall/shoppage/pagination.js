import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Host } from '@/components/shopmall/shopmallfinal'
import { useRouter } from 'next/router';
export default function ShopPagination() {
  const {page, dispatch, items} = React.useContext(Host);
  const router = useRouter()
  const handlePageChange = (event, page) => {
    dispatch({
      type:'SET_PAGE',
      payload: page,
    })
  }
  React.useEffect(()=>{
    const query = {...router.query}
    if(page) {
      query.page = page
    }
    router.push({
      pathname:router.pathname,
      query:query
    })
  },[page])
  return (
    <div className='w-100 d-flex justify-content-center mb-5 pb-5 mt-2'>
      <Stack spacing={2}>
      {console.log(items.length)}
        <Pagination count={items.length} sx={{ '& .MuiPaginationItem-root': {
              fontSize: 25,
            },
            '& .Mui-selected': {
              fontSize: 30, 
            },
            '& .MuiPaginationItem-page': {
              minWidth: '50px',
              padding: '7px',
            },
             }}
             onChange={handlePageChange} 
             />
      </Stack>
    </div>
  );
}