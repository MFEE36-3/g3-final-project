import React from 'react'
import Image from 'next/image'
import style from '@/styles/reservation/style.module.css'
import Interior from '@/public/reservation/interior.svg'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export default function InteriorPic({ row, date, time, person, seat, setSeat }) {

    const [disableSeats, setDisableSeats] = useState([]);

    const handleSeat = (e) => {
        const selectedSeat = e.currentTarget.getAttribute('data-value');
        setSeat(selectedSeat);
        console.log(selectedSeat);

    }

    useEffect(() => {
        // 過濾出符合日期和時間的資料
        const filteredBookings = row.booking?.filter(
            (booking) =>
                dayjs(booking.booking_date).format('YYYY-MM-DD') === date && booking.booking_time === time
        );


        // 從過濾後的資料中取得table值
        const bookedTables = filteredBookings?.map((booking) => booking.table);
        // console.log(bookedTables); ['4s1']

        const updatedDisableSeats = row.seattype.reduce((acc, seatData) => {
            const seatId = seatData.seat_id;
            const seatNumber = seatData.seat_number;
            const isSeatDisabled = bookedTables.includes(seatId) || person > seatNumber;

            if (isSeatDisabled) {
                acc.push(seatId);
            }
            return acc;
        }, []);




        // 設定要disable的座位
        setDisableSeats(updatedDisableSeats);
    }, [date, time, row.booking, row.seattype]);



    return (
        <div className='d-flex justify-content-center'
            style={{
                backgroundImage: `url(${Interior.src})`,
                width: "836px",
                height: "424px",
                position: "relative"
            }}
        >

            <svg className={`${style.svgicon} ${style.svg21} ${seat === '21' ? style.svgactive : ''} ${disableSeats.includes('21') ? style.svgdisabled : ''}`} data-value="21" onClick={handleSeat} width="30" height="77" viewBox="0 0 30 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="54" width="30" height="30" transform="rotate(-90 0 54)" fill={disableSeats.includes('21') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="15" cy="68" r="9" transform="rotate(-90 15 68)" fill={disableSeats.includes('21') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="14.5" cy="9.5" r="9" transform="rotate(-90 14.5 9.5)" fill={disableSeats.includes('21') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg22} ${seat === '22' ? style.svgactive : ''}`} onClick={handleSeat} data-value="22" disabled={disableSeats.includes('22')} width="30" height="77" viewBox="0 0 30 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="54" width="30" height="30" transform="rotate(-90 0 54)" fill={disableSeats.includes('22') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="15" cy="68" r="9" transform="rotate(-90 15 68)" fill={disableSeats.includes('22') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="14.5" cy="9.5" r="9" transform="rotate(-90 14.5 9.5)" fill={disableSeats.includes('22') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg23} ${seat === '23' ? style.svgactive : ''}`} onClick={handleSeat} data-value="23" disabled={disableSeats.includes('23')} width="30" height="77" viewBox="0 0 30 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="54" width="30" height="30" transform="rotate(-90 0 54)" fill={disableSeats.includes('23') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="15" cy="68" r="9" transform="rotate(-90 15 68)" fill={disableSeats.includes('23') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="14.5" cy="9.5" r="9" transform="rotate(-90 14.5 9.5)" fill={disableSeats.includes('23') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg24} ${seat === '24' ? style.svgactive : ''}`} onClick={handleSeat} data-value="24" disabled={disableSeats.includes('24')} width="30" height="77" viewBox="0 0 30 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="54" width="30" height="30" transform="rotate(-90 0 54)" fill={disableSeats.includes('24') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="15" cy="68" r="9" transform="rotate(-90 15 68)" fill={disableSeats.includes('24') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="14.5" cy="9.5" r="9" transform="rotate(-90 14.5 9.5)" fill={disableSeats.includes('24') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg2s1} ${seat === '2s1' ? style.svgactive : ''}`} onClick={handleSeat} data-value="2s1" disabled={disableSeats.includes('2s1')} width="78" height="31" viewBox="0 0 78 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="54.25" y="30.25" width="30" height="30" transform="rotate(-180 54.25 30.25)" fill={disableSeats.includes('2s1') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="68.25" cy="15.25" r="9" transform="rotate(-180 68.25 15.25)" fill={disableSeats.includes('2s1') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="9.75" cy="15.75" r="9" transform="rotate(-180 9.75 15.75)" fill={disableSeats.includes('2s1') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg2s2} ${seat === '2s2' ? style.svgactive : ''}`} onClick={handleSeat} data-value="2s2" disabled={disableSeats.includes('2s2')} width="78" height="31" viewBox="0 0 78 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="54.25" y="30.25" width="30" height="30" transform="rotate(-180 54.25 30.25)" fill={disableSeats.includes('2s2') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="68.25" cy="15.25" r="9" transform="rotate(-180 68.25 15.25)" fill={disableSeats.includes('2s2') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="9.75" cy="15.75" r="9" transform="rotate(-180 9.75 15.75)" fill={disableSeats.includes('2s2') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg2s3} ${seat === '2s3' ? style.svgactive : ''}`} onClick={handleSeat} data-value="2s3" disabled={disableSeats.includes('2s3')} width="78" height="31" viewBox="0 0 78 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="54.25" y="30.25" width="30" height="30" transform="rotate(-180 54.25 30.25)" fill={disableSeats.includes('2s3') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="68.25" cy="15.25" r="9" transform="rotate(-180 68.25 15.25)" fill={disableSeats.includes('2s3') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="9.75" cy="15.75" r="9" transform="rotate(-180 9.75 15.75)" fill={disableSeats.includes('2s3') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg41} ${seat === '41' ? style.svgactive : ''}`} onClick={handleSeat} data-value="41" disabled={disableSeats.includes('41')} width="80" height="65" viewBox="0 0 80 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="23" width="33.8144" height="65" fill={disableSeats.includes('41') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('41') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('41') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('41') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('41') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg42} ${seat === '42' ? style.svgactive : ''}`} onClick={handleSeat} data-value="42" disabled={disableSeats.includes('42')} width="80" height="65" viewBox="0 0 80 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="23" width="33.8144" height="65" fill={disableSeats.includes('42') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('42') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('42') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('42') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('42') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg43} ${seat === '43' ? style.svgactive : ''}`} onClick={handleSeat} data-value="43" disabled={disableSeats.includes('43')} width="80" height="65" viewBox="0 0 80 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="23" width="33.8144" height="65" fill={disableSeats.includes('43') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('43') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('43') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="61.0312" y="39.1113" width="18.9691" height="20" fill={disableSeats.includes('43') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="6.61133" width="18.9691" height="20" fill={disableSeats.includes('43') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg4s1} ${seat === '4s1' ? style.svgactive : ''}${disableSeats.includes('4s1') ? style.svgdisabled : ''}`} onClick={handleSeat} data-value="4s1" width="143" height="143" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="29.0742" y="42.5078" width="18" height="18" transform="rotate(-45 29.0742 42.5078)" fill={disableSeats.includes('4s1') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="87.7617" y="101.199" width="18" height="18" transform="rotate(-45 87.7617 101.199)" fill={disableSeats.includes('4s1') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="87.7617" y="41.8008" width="18" height="18" transform="rotate(-45 87.7617 41.8008)" fill={disableSeats.includes('4s1') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="29.0742" y="100.492" width="18" height="18" transform="rotate(-45 29.0742 100.492)" fill={disableSeats.includes('4s1') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="34.0234" y="71.5" width="53" height="53" transform="rotate(-45 34.0234 71.5)" fill={disableSeats.includes('4s1') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg4s2} ${seat === '4s2' ? style.svgactive : ''}`} onClick={handleSeat} data-value="4s2" disabled={disableSeats.includes('4s2')} width="143" height="143" viewBox="0 0 143 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="29.0742" y="42.5078" width="18" height="18" transform="rotate(-45 29.0742 42.5078)" fill={disableSeats.includes('4s2') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="87.7617" y="101.199" width="18" height="18" transform="rotate(-45 87.7617 101.199)" fill={disableSeats.includes('4s2') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="87.7617" y="41.8008" width="18" height="18" transform="rotate(-45 87.7617 41.8008)" fill={disableSeats.includes('4s2') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="29.0742" y="100.492" width="18" height="18" transform="rotate(-45 29.0742 100.492)" fill={disableSeats.includes('4s2') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="34.0234" y="71.5" width="53" height="53" transform="rotate(-45 34.0234 71.5)" fill={disableSeats.includes('4s2') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg6} ${seat === '6' ? style.svgactive : ''}`} onClick={handleSeat} data-value="6" disabled={disableSeats.includes('6')} width="98" height="97" viewBox="0 0 98 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='aaa' x="39" width="18" height="18" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <rect width="18" height="18" transform="matrix(0.517729 0.855545 -0.875908 0.482478 87.7656 16)" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <rect width="18" height="18" transform="matrix(0.517729 0.855545 -0.875908 0.482478 16.9688 55.584)" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <rect width="18" height="18" transform="matrix(0.517729 -0.855545 0.875908 0.482478 0 33.4004)" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <rect width="18" height="18" transform="matrix(0.517729 -0.855545 0.875908 0.482478 69.6562 73.8672)" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="38.8477" y="78.5469" width="18" height="18" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
                <circle cx="48.5" cy="48.5" r="26.5" fill={disableSeats.includes('6') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg8} ${seat === '8' ? style.svgactive : ''}`} onClick={handleSeat} data-value="8" disabled={disableSeats.includes('8')} width="103" height="145" viewBox="0 0 103 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="72" y="145" width="41" height="145" transform="rotate(-180 72 145)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="134" width="18" height="18" transform="rotate(-90 0 134)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="29" width="18" height="18" transform="rotate(-90 0 29)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="64" width="18" height="18" transform="rotate(-90 0 64)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect y="99" width="18" height="18" transform="rotate(-90 0 99)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="85" y="134" width="18" height="18" transform="rotate(-90 85 134)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="85" y="29" width="18" height="18" transform="rotate(-90 85 29)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="85" y="64" width="18" height="18" transform="rotate(-90 85 64)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
                <rect x="85" y="99" width="18" height="18" transform="rotate(-90 85 99)" fill={disableSeats.includes('8') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

            <svg className={`${style.svgicon} ${style.svg8s} ${seat === '8s' ? style.svgactive : ''}`} onClick={handleSeat} data-value="8s" disabled={disableSeats.includes('8s')} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="59.5069" cy="60.4998" rx="35.9014" ry="36.4998" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="35.9013" cy="11.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="83.1161" cy="108.5" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="34.9169" cy="108.5" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="108.69" cy="77.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="108.69" cy="40.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="12.2919" cy="77.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="80.163" cy="11.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
                <ellipse cx="11.3114" cy="40.4999" rx="11.3114" ry="11.4999" fill={disableSeats.includes('8s') ? '#fab3b3' : '#FFFFFF'} />
            </svg>

        </div >
    )
}
