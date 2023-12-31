import React, { createContext, useState, useReducer, useEffect} from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle'
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
import SearchBar from '@/components/shopmall/searchbar/searchbar'
import ShopPagination from '@/components/shopmall/shoppage/pagination';
import Loading from '@/public/trycheckoutimage/loading.svg'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

export const Host = createContext()

const initialState = {
  host: process.env.API_SERVER,
  // host: "http://192.168.50.169:8000",
  categories: {},
  items: [],
  keyword: '',
  priceRange: {
    min: '',
    max: '',
  },
  ratingFilter: '',
  sortby:'',
  order:'',
  isLoading:true,
  page:1,
  isReset:false,
}

const LoadingSvg = styled.img`
  width:5%;
  @keyframes LoadingRun{
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(720deg);    
  }
  }
  animation: LoadingRun 8s ease-in-out infinite
`
const HoverBtn = styled.button`
  &:hover{
    text-decoration:underline
  }
`

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload }
    case 'SET_MIN_PRICE':
      return { ...state, priceRange: { ...state.priceRange, min: action.payload } }
    case 'SET_MAX_PRICE':
      return { ...state, priceRange: { ...state.priceRange, max: action.payload } }
    case 'SET_RATING_FILTER':
      return { ...state, ratingFilter: action.payload }
    case 'SET_SORTBY':
      return { ...state, sortby: action.payload }
    case 'SET_ORDER':
      return { ...state, order: action.payload }
    case 'SET_LOADING' :
      return { ...state, isLoading: action.payload }
    case 'SET_PAGE' :
      return { ...state, page: action.payload }
    case 'SET_TOTALPAGES' :
      return { ...state, totalPages: action.payload }
    case 'SET_RESET' :
      return { ...state, isReset: action.payload }
    default:
      return state
  }
}

const LoadingAni = () => {
  return (
    <div className='w-100 d-flex justify-content-center '>
     <LoadingSvg src={Loading.src}></LoadingSvg>
    </div>
  )
}
export default function ShopMallFinal() {
  const [RWD, setRWD] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedCategory, setSelectedCategory] = useState([])
  const [rating, setRating] = useState('')
  const router = useRouter()
  const resetButton = () => {
    dispatch({
      type: 'SET_RESET',
      payload: true
    });
  }
  useEffect(() => {
    const { keyword, cate_ids, order_key, order_type, rating_filter, price_min, price_max, page} = router.query;
    dispatch({ type: 'SET_KEYWORD', payload: keyword || '' });
    dispatch({ type: 'SET_SORTBY', payload: order_key || '' });
    dispatch({ type: 'SET_ORDER', payload: order_type || '' });
    dispatch({ type: 'SET_RATING_FILTER', payload: rating_filter || '' });
    dispatch({ type: 'SET_MIN_PRICE', payload: price_min || '' });
    dispatch({ type: 'SET_MAX_PRICE', payload: price_max || '' });
    dispatch({ type: 'SET_PAGE', payload: page})
    const fetchData = async () => {
      let successSubscribe = true;
      let query = {
        keyword: keyword || '',
        cate_ids: selectedCategory ? selectedCategory.join('%') : [],
        order_key: order_key || '',
        order_type: order_type || '',
        rating_filter: rating_filter || '',
        price_min: price_min || '',
        price_max: price_max || '',
        page: page || 1,
      };
      const queryUrl = new URLSearchParams(query).toString();
      const url = `${state.host}/ecshop/item?${state.isReset ? '' : queryUrl}`;
      // console.log(`start fetching ${url}`);
      const response = await fetch(url);
      const { data, pagination } = await response.json();
      if(successSubscribe){
        // console.log(`start dispatch ${url}`);
        dispatch({
          type: 'SET_ITEMS',
          payload: data
        });
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
        dispatch({
          type: 'SET_TOTALPAGES',
          payload: pagination.totalPages
        })
      }
      return () =>{
        // console.log(`revoke fetching ${url}`);
        successSubscribe = false
      }
    };
    fetchData();
  }, [router.query]);
  useEffect(()=>{
    // console.log('hi Goreset')
    const query = { };
    router.push({
      pathname: router.pathname,
      query: query
    }, undefined, { scroll: false });
    dispatch({
      type:'SET_RESET',
      payload: false
    })
  },[state.isReset])
  return (
    <Host.Provider value={{ ...state, dispatch, selectedCategory, setSelectedCategory, rating, setRating, RWD, setRWD}}>
      <ShopContainer>
        <SearchBar/>
        <ShopBodyForSearch>
          <ShopFilter />
          <div className='col-xl-10 col-12 ps-0 pe-0'>
            <ShopSearchTitle/>
            {!state.isLoading && <HoverBtn onClick={resetButton} className='border-0 mb-5 text-danger bg-transparent fs-4 ms-xl-4 ms-1 ps-1 fw-bold' >清除篩選條件</HoverBtn>}
            {state.isLoading ? LoadingAni() :<ShopCard/>}
            {!state.isLoading && state.items.length !== 0 && <ShopPagination />}
          </div>
        </ShopBodyForSearch>
      </ShopContainer>
    </Host.Provider>
  )
}
