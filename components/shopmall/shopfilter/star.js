import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer, useState,} from 'react'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import {Host} from '@/components/shopmall/shopmallfinal'

const H4div = styled.div`
    font-size:var(--h4)
`
const Nobgbutton = styled.button`
    background:none
`
export default function Star() {
    const {ratingFilter, dispatch , isReset} = useContext(Host)
    const [rating, setRating] = useState('')
    const handleRatingChange = (v) => {
        setRating(v)
        dispatch({
            type: 'SET_RATING_FILTER',
            payload: rating === v ? setRating('') : v
        })
    }
    useEffect(()=>{
        if(isReset) return
        const query = {...router.query};
        if (rating) {
            query.rating_filter = rating
          } else {
            delete query.rating_filter
          }
        router.push({
            pathname : router.pathname,
            query:query
        }, undefined, {scroll:false})

    },[ratingFilter])
    const active = `bg-secondary-subtle`
    const router = useRouter();
    const reset = () => {
        if(isReset) setRating('')
        dispatch({
            type:'SET_RATING_FILTER',
            payload:''
        })
    }
    useEffect(()=>{
    reset();
    },[isReset])
  return (
    <div className='mt-4 border-bottom border-2 pb-4'>
        <H4div>評分</H4div>
        <div className='px-1'>
            <Nobgbutton className={`d-flex text-warning border-0 fs-4 rounded-4 px-1 mt-4 ${rating === 5 && active}`} onClick={()=>handleRatingChange(5)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 px-1 rounded-4 ${rating === 4 && active}`} onClick={()=>handleRatingChange(4)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 3 && active}`} onClick={()=>handleRatingChange(3)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 2 && active}`} onClick={()=>handleRatingChange(2)}>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <AiOutlineStar></AiOutlineStar>
                <span className='ms-1 text-dark fs-5'>或以上</span>
            </Nobgbutton>
            <Nobgbutton className={`d-flex mt-3 px-1 align-items-center text-warning border-0 fs-4 rounded-4 ${rating === 1 && active}`} onClick={()=>handleRatingChange(1)}>
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
