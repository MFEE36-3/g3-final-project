import React, { createContext, useState, useReducer, useEffect} from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle'
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
import SearchBar from '@/components/shopmall/searchbar/searchbar'
import { useRouter } from 'next/router'
import { sortBy } from 'lodash'

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
  ratingFilter: null,
  sortby:'',
  order:'',
}


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
      return { ...state, sortby: action.payload}
    case 'SET_ORDER':
      return { ...state, order: action.payload}
    default:
      return state
  }
}

export default function ShopMallFinal() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedCategory, setSelectedCategory] = useState([])
  const router = useRouter()
  useEffect(()=>{
    const query = {...router.query}
    if(state.keyword) {
      query.keyword = state.keyword
    }
    if(selectedCategory) query.cate_ids = selectedCategory.join("%")
    if(state.sortby) query.order_key = state.sortby
    if(state.order) query.order_type = state.order
    if(state.ratingFilter) query.rating_filter = state.ratingFilter
    if(state.priceRange.min) query.price_min = state.priceRange.min
    if(state.priceRange.max) query.price_max = state.priceRange.max
    const queryUrl = new URLSearchParams(query).toString()
    console.log(queryUrl)
    // const url = state.keyword ? `${state.host}/api/item?${queryUrl}` : `${state.host}/api/item`
    const url =`${state.host}/api/item?${queryUrl}`
    const fetchData = async () => {
      const response = await fetch(url)
      const {data} = await response.json()
      dispatch({
        type:"SET_ITEMS",
        payload: data
      })
    }
    fetchData()
  },[state.keyword, selectedCategory, state.sortby, state.order, state.ratingFilter, state.priceRange.min, state.priceRange.max])
  
  return (
    <Host.Provider value={{ ...state, dispatch, selectedCategory, setSelectedCategory}}>
      <ShopContainer>
        <SearchBar/>
        <ShopBodyForSearch>
          <ShopFilter />
          <div className='col-9'>
            <ShopSearchTitle />
            <ShopCard/>
          </div>
        </ShopBodyForSearch>
      </ShopContainer>
    </Host.Provider>
  )
}
