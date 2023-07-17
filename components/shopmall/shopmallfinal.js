import React, { createContext, useState } from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle'
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
import SearchBar from '@/components/shopmall/searchbar/searchbar'
export const Host = createContext();
const host = "http://127.0.0.1:8000"
export default function ShopMallFinal() {
  const [categories, setCategories] = useState({});
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] =useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState();
    return (
    <Host.Provider value={{host, categories, setCategories, items, setItems, keyword, setKeyword, minPrice, setMinPrice, maxPrice, setMaxPrice, ratingFilter, setRatingFilter}}>
      <ShopContainer>
        <SearchBar/>
        <ShopBodyForSearch>
          <ShopFilter/>
          <div className='col-9'>
          <ShopSearchTitle/>
          <ShopCard/>
          </div>
        </ShopBodyForSearch>
      </ShopContainer>
    </Host.Provider>
  )
}
