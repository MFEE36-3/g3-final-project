import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
const H4div = styled.div`
    font-size:var(--h4)
`
const Nobgbutton = styled.button`
    background:none
`
export default function Star() {
    const [ratingFilter, setRatingFilter] = useState();
    const handleRatingChange = (v) => {
        setRatingFilter(v)
    }
    useEffect(()=>{
        const query = {...router.query};
        if(ratingFilter){
            query.ratingFilter = ratingFilter
        }
        router.push({
            pathname : router.pathname,
            query:query
        })
    },[ratingFilter])
    const active = `bg-secondary-subtle`
    const router = useRouter();
  return (
    <div className='mt-4 border-bottom border-2 pb-4'>
        <H4div>評分</H4div>
        <div className='px-3'>
            <Nobgbutton className={`d-flex text-warning border-0 fs-4 rounded-4 w-50 px-3 mt-4 ${ratingFilter === 5 && active}`} onClick={()=>handleRatingChange(5)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 w-75  align-items-center text-warning border-0 fs-4 px-3 rounded-4 ${ratingFilter === 4 && active}`} onClick={()=>handleRatingChange(4)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 w-75  align-items-center text-warning border-0 fs-4 rounded-4 px-3 ${ratingFilter === 3 && active}`} onClick={()=>handleRatingChange(3)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 w-75  align-items-center text-warning border-0 fs-4 rounded-4 px-3 ${ratingFilter === 2 && active}`} onClick={()=>handleRatingChange(2)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 w-75 px-3 align-items-center text-warning border-0 fs-4 rounded-4 ${ratingFilter === 1 && active}`} onClick={()=>handleRatingChange(1)}>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
        </div>
    </div>
  )
}
