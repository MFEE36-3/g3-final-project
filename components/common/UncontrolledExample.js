import Carousel from 'react-bootstrap/Carousel';
import ABC from '@/public/f_imgs/111.jpg';
import CBA from '@/public/f_imgs/下載.jpeg'
import Image from 'next/image';
function UncontrolledExample() {
  return (
    <Carousel style={{height:"20vh"}} className='overflow-hidden object-fit-fill'>
      <Carousel.Item className=' '>
        <Image
          className="d-block w-100 h-100 object-fit-cover" 
          src={ABC}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={CBA}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={ABC}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;