import React, { createContext } from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle'
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
import SearchBar from '@/components/shopmall/searchbar/searchbar'
export const Host = createContext();
const host = "http://192.168.50.169:8000"
export default function ShopMallFinal() {
  return (
    <Host.Provider value={{host}}>
      <ShopContainer>
        <ShopHead/>
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
