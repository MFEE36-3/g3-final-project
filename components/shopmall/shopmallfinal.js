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
  host: "http://127.0.0.1:8000",
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
  page:''
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedCategory, setSelectedCategory] = useState([])
  const router = useRouter()
  // useEffect(()=>{
  //   const query = {...router.query}
  //   if(state.keyword) {
  //     query.keyword = state.keyword
  //   }
  //   if(selectedCategory.length > 0) {
  //     query.cate_ids = selectedCategory.join("%")
  //   }else {
  //     delete query.cate_ids
  //   }
  //   if(state.sortby) query.order_key = state.sortby
  //   if(state.order) query.order_type = state.order
  //   if(state.ratingFilter) query.rating_filter = state.ratingFilter
  //   if(state.priceRange.min) query.price_min = state.priceRange.min
  //   if(state.priceRange.max) query.price_max = state.priceRange.max
  //   const queryUrl = new URLSearchParams(query).toString()
  //   console.log(queryUrl)
  //   // const url = state.keyword ? `${state.host}/api/item?${queryUrl}` : `${state.host}/api/item`
  //   const url =`${state.host}/api/item?${queryUrl}`
  //   const fetchData = async () => {
  //     const response = await fetch(url)
  //     const {data} = await response.json()
  //     dispatch({
  //       type:"SET_ITEMS",
  //       payload: data
  //     })
  //   }
  //   fetchData()
  // },[state.keyword, selectedCategory, state.sortby, state.order, state.ratingFilter, state.priceRange.min, state.priceRange.max])
  useEffect(() => {
    const { keyword, cate_ids, order_key, order_type, rating_filter, price_min, price_max, page} = router.query;
    dispatch({ type: 'SET_KEYWORD', payload: keyword || '' });
    dispatch({ type: 'SET_SORTBY', payload: order_key || '' });
    dispatch({ type: 'SET_ORDER', payload: order_type || '' });
    dispatch({ type: 'SET_RATING_FILTER', payload: rating_filter || '' });
    dispatch({ type: 'SET_MIN_PRICE', payload: price_min || '' });
    dispatch({ type: 'SET_MAX_PRICE', payload: price_max || '' });
    dispatch({ type: 'SET_PAGE', payload: page || 1})
    const fetchData = async () => {
      const query = {
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
      console.log(queryUrl);
      const url = `${state.host}/api/item?${queryUrl}`;

      const response = await fetch(url);
      const { data } = await response.json();
      dispatch({
        type: 'SET_ITEMS',
        payload: data
      });
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    };
    fetchData();
  }, [router.query]);
  return (
    <Host.Provider value={{ ...state, dispatch, selectedCategory, setSelectedCategory}}>
      <ShopContainer>
        <SearchBar/>
        <ShopBodyForSearch>
          <ShopFilter />
          <div className='col-10'>
            <ShopSearchTitle />
            {state.isLoading ? LoadingAni() :<ShopCard/>}
            <ShopPagination />
          </div>
          
        </ShopBodyForSearch>
      </ShopContainer>
    </Host.Provider>
  )
}