import React from 'react'
import ShopContainer from '@/components/shopmall/shopcontainer/shopcontainer'
import ShopHead from '@/components/shopmall/shophead/shophead'
import ShopCard from '@/components/shopmall/shopcard/shopcard'
import ShopBody from '@/components/shopmall/shopbody/shopbody'
import ShopFilter from '@/components/shopmall/shopfilter/shopfilter'
export default function ShopMallFinal() {
  return (
    <>
      <ShopContainer>
        <ShopHead/>
        <ShopBody>
          <ShopFilter/>
          <ShopCard/>
        </ShopBody>
      </ShopContainer>
    </>
  )
}
