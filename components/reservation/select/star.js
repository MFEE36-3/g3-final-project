import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Host } from '@/components/shopmall/shopmallfinal'

const H4div = styled.div`font-size:var(--h4)`
const Nobgbutton = styled.button`background:none`

export default function Star({ keyword, setKeyword}) {
  // const { ratingFilter, dispatch } = useContext(Host)
  const [rating,setRating] = useState();
  const router = useRouter();
  const handleRatingChange = (v) => {
    setRating(rating === v ? '' : v)
    setKeyword({ ...keyword, star: v });
  }

  useEffect(() => {
    const strcity = router.query.city;
    const arrdist = router.query.dist;

    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();

    const slideval = router.query.price;
    const numstar = rating;
    const searchkeyword = router.query.searchkeyword;


    const usp = new URLSearchParams();
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (strcity) {
      usp.set('city', strcity);
    }
    if (arrdist) {
      usp.set('dist', '');
    }
    if (slideval) {
      usp.set('price', slideval);
    }
    if (numstar) {
      usp.set('star', numstar);
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }


    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString();

    // 修改 router.push 部分
    let url = '';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push({
      pathname: router.pathname,
      search: url
    }, undefined, { scroll: false });
  }, [rating])



  const active = 'bg-secondary-subtle'

  return (
    <div className='w-100 mt-4 border-bottom border-2 pb-4'>
      <H4div>評分</H4div>
      <div className='px-1'>
        <Nobgbutton className={`d-flex text-warning border-0 fs-4 rounded-4  px-1 mt-4 ${rating === 5 && active}`} onClick={() => handleRatingChange(5)}>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
        </Nobgbutton>
        <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 px-1 rounded-4 ${rating === 4 && active}`} onClick={() => handleRatingChange(4)}>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiOutlineStar></AiOutlineStar>
          <span className='ms-1 text-dark fs-5'>或以上</span>
        </Nobgbutton>
        <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 3 && active}`} onClick={() => handleRatingChange(3)}>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiOutlineStar></AiOutlineStar>
          <AiOutlineStar></AiOutlineStar>
          <span className='ms-1 text-dark fs-5'>或以上</span>
        </Nobgbutton>
        <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 2 && active}`} onClick={() => handleRatingChange(2)}>
          <AiFillStar></AiFillStar>
          <AiFillStar></AiFillStar>
          <AiOutlineStar></AiOutlineStar>
          <AiOutlineStar></AiOutlineStar>
          <AiOutlineStar></AiOutlineStar>
          <span className='ms-1 text-dark fs-5'>或以上</span>
        </Nobgbutton>
        <Nobgbutton className={`d-flex mt-3 px-1 align-items-center text-warning border-0 fs-4 rounded-4 ${rating === 1 && active}`} onClick={() => handleRatingChange(1)}>
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
