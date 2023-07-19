import React, { createContext, useState, useReducer, useEffect} from 'react';
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer';
import ShopHead from '@/components/shopmall/shophead/shophead';
import ShopCard from '@/components/shopmall/shopcard/shopcard';
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle';
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody';
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter';
import SearchBar from '@/components/shopmall/searchbar/searchbar';
import { useRouter } from 'next/router';

export const Host = createContext();

const initialState = {
  host: "http://127.0.0.1:8000",
  categories: {},
  items: [],
  keyword: '',
  priceRange: {
    min: '',
    max: '',
  },
  ratingFilter: null,
};


function reducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    case 'SET_MIN_PRICE':
      return { ...state, priceRange: { ...state.priceRange, min: action.payload } };
    case 'SET_MAX_PRICE':
      return { ...state, priceRange: { ...state.priceRange, max: action.payload } };
    case 'SET_RATING_FILTER':
      return { ...state, ratingFilter: action.payload };
    default:
      return state;
  }
}

export default function ShopMallFinal() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  useEffect(()=>{
    const query = {...router.query}
    if(state.keyword) query.keyword = state.keyword
    const queryUrl = new URLSearchParams(query).toString()
    const url = `${state.host}/api/item?${queryUrl}`
    const fetchData = async () => {
      const response = await fetch(url);
      const {data} = await response.json();
      dispatch({
        type:"SET_ITEMS",
        payload: data
      })
    }
    fetchData()
  },[state.keyword])
  return (
    <Host.Provider value={{ ...state, dispatch}}>
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
      {console.log(state.keyword)}
    </Host.Provider>
  );
}
