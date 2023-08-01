import style from '@/styles/reservation/style.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarouselDiv() {
  return (
    <Carousel className={style.carousel} indicators={false} controls={false}>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className={`${style.carouselitem} d-block w-100`}
          src="../../reservation/one.jpeg"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className={`${style.carouselitem} d-block w-100`}
          src="http://localhost:3000/reservation/two.jpeg"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500} className={style.carousel}>
        <img
          className={`${style.carouselitem} d-block w-100`}
          src="http://localhost:3000/reservation/three.jpeg"
        />
      </Carousel.Item>
    </Carousel>
  );
}
