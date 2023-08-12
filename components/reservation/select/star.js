import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { FaArrowUp } from 'react-icons/fa'
import style from '@/styles/reservation/style.module.css'

const Nobgbutton = styled.button`background:none`

export default function Star({ keyword, setKeyword }) {

    const [rating, setRating] = useState();
    const router = useRouter();

    const handleRatingChange = (e) => {
        const ratingnum = e.currentTarget.getAttribute('data-value');
        // console.log(ratingnum);

        setRating(rating === ratingnum ? '' : ratingnum)
        setKeyword({ ...keyword, star: ratingnum });

        const strcity = router.query.city;
        const arrdist = router.query.dist;

        const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
        const strfoodtype = arrfoodtype.join();

        const slideval = router.query.price;
        const numstar = ratingnum;
        const searchkeyword = router.query.searchkeyword;


        const usp = new URLSearchParams();
        if (strfoodtype) {
            usp.set('foodtype', strfoodtype);
        }
        if (strcity) {
            usp.set('city', strcity);
        }
        if (arrdist) {
            usp.set('dist', arrdist);
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

    }


    const active = 'bg-secondary-subtle'

    return (
        <div className='w-100 mt-4 pb-4'>
            <p className={style.selecttitle}>評分</p>
            <hr />
            <div className='px-1'>
                <Nobgbutton className={`d-flex text-warning border-0 fs-4 rounded-4  px-1 mt-4 ${rating === 5 && active}`}>
                    <span data-value="5" onClick={handleRatingChange}>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                    </span>
                </Nobgbutton>
                <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 px-1 rounded-4 ${rating === 4 && active}`}>
                    <span data-value="4" onClick={handleRatingChange}>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                        <FaArrowUp className='ms-1'></FaArrowUp>
                    </span>
                </Nobgbutton>
                <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 3 && active}`}>
                    <span data-value="3" onClick={handleRatingChange}>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <FaArrowUp className='ms-1'></FaArrowUp>
                    </span>
                </Nobgbutton>
                <Nobgbutton className={`d-flex mt-3 align-items-center text-warning border-0 fs-4 rounded-4 px-1 ${rating === 2 && active}`}>
                    <span data-value="2" onClick={handleRatingChange}>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <FaArrowUp className='ms-1'></FaArrowUp>
                    </span>
                </Nobgbutton>
                <Nobgbutton className={`d-flex mt-3 px-1 align-items-center text-warning border-0 fs-4 rounded-4 ${rating === 1 && active}`}>
                    <span data-value="1" onClick={handleRatingChange}>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <AiOutlineStar></AiOutlineStar>
                        <FaArrowUp className='ms-1'></FaArrowUp>
                    </span>
                </Nobgbutton>
            </div>
        </div>
    )
}
