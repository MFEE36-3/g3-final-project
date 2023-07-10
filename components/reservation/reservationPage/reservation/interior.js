import React from 'react'
import Image from 'next/image'
import Interior from '@/public/reservation/interior.svg'
import Seat2 from '@/public/reservation/2-seat.svg'
import Seat2s from '@/public/reservation/2s-seat.svg'
import Seat4 from '@/public/reservation/4-seat.svg'
import Seat4s from '@/public/reservation/4s-seat.svg'
import Seat6 from '@/public/reservation/6-seat.svg'
import Seat8 from '@/public/reservation/8-seat.svg'
import Seat8s from '@/public/reservation/8s-seat.svg'


export default function InteriorPic() {


    return (
        <div className='d-flex justify-content-center'
            style={{
                backgroundImage: `url(${Interior.src})`,
                width: "836px",
                height: "424px",
                position: "relative"
            }}>

            <Image src={Seat6}
                style={{ position: "absolute", top: "12px", left: "20px" ,color:"red"}} />
            <Image src={Seat8}
                style={{ position: "absolute", top: "30px", right: "30px" }} />
            <Image src={Seat8s}
                style={{ position: "absolute", bottom: "40px", right: "20px" }} />
            <Image src={Seat4}
                style={{ position: "absolute", top: "260px", left: "200px" }} />
            <Image src={Seat4}
                style={{ position: "absolute", top: "260px", left: "350px" }} />
            <Image src={Seat4}
                style={{ position: "absolute", top: "80px", left: "530px" }} />

            <Image src={Seat4s}
                style={{ position: "absolute", top: "130px", left: "150px" }} />
            <Image src={Seat4s}
                style={{ position: "absolute", top: "130px", left: "280px" }} />

            <Image src={Seat2}
                style={{ position: "absolute", top: "10px", left: "180px" }} />
            <Image src={Seat2}
                style={{ position: "absolute", top: "10px", left: "240px" }} />
            <Image src={Seat2}
                style={{ position: "absolute", top: "10px", left: "300px" }} />
            <Image src={Seat2}
                style={{ position: "absolute", top: "10px", left: "360px" }} />
            <Image src={Seat2s}
                style={{ position: "absolute", bottom: "10px", left: "120px" }} />
            <Image src={Seat2s}
                style={{ position: "absolute", bottom: "10px", left: "250px" }} />
            <Image src={Seat2s}
                style={{ position: "absolute", bottom: "10px", left: "380px" }} />

        </div>
    )
}
