import styled from '@emotion/styled'
import React from 'react'

const H3div = styled.div`
      font-size:var(--h3)
`
const H5div = styled.div`
      font-size:var(--h5)
`
export default function ShopFilter() {
  return (
    <div className='col-3 bg-warning'>
      <H3div>篩選</H3div>

    </div>
  )
}

