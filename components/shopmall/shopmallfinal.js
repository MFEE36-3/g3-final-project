import React from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopSearchTitle from '@/components/shopmall/shoptitle/shopsearchtitle'
import ShopBodyForSearch from '@/components/shopmall/shopbodyforsearch/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
import SearchBar from '@/components/shopmall/searchbar/searchbar'
export default function ShopMallFinal() {
  return (
    <>
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
    </>
  )
}
