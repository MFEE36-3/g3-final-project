import style from '@/styles/reservation/style.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarouselDiv() {
  return (
    <Carousel>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className="d-block w-100"
          src="../../reservation/one.jpeg"
          alt=""
          style={{ objectFit: 'cover', overFlow: 'hidden' }}
        />
      </Carousel.Item>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className="d-block w-100"
          src="http://localhost:3000/reservation/two.jpeg"
          alt=""
          style={{ objectFit: 'cover', overFlow: 'hidden' }}
        />
      </Carousel.Item>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className="d-block w-100"
          src="http://localhost:3000/reservation/three.jpeg"
          alt=""
          style={{ objectFit: 'cover', overFlow: 'hidden' }}
        />
      </Carousel.Item>
    </Carousel>
  );
}
