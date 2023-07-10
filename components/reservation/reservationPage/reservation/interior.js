import React from 'react'
import Image from 'next/image'
import Interior from '@/public/reservation/interior.svg'
import Seat2 from '@/public/reservation/2-seat.svg'

export default function InteriorPic() {


    return (
        <div className='d-flex justify-content-center'
            style={{
                backgroundImage: `url(${Interior.src})`, width: "836px",
                height: "424px"
            }}>
            <Image src={Seat2} />
        </div>
    )
}
