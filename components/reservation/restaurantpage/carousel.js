import style from '@/styles/reservation/style.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Rcarousel({ row }) {

    return (
        <div>
            <div className={style.carousel} style={{ overflow: 'hidden' }}>
                <img
                    className="d-block w-100"
                    src={`${process.env.API_SERVER}/img/shops/${row.detail?.photo}`}
                    style={{ objectFit: 'cover', overFlow: 'hidden', marginTop: '-250px' }}
                />
            </div>
        </div>
    )
}
