import Carousel from 'react-bootstrap/Carousel';
import ABC from '@/public/f_imgs/圖片1.webp';
import CBA from '@/public/f_imgs/圖片2.webp';
import QQQ from '@/public/f_imgs/圖片3.webp';
import Image from 'next/image';
function UncontrolledExample() {
  return (
    <Carousel
      style={{ height: '390px', width: '100%' }}
      className="overflow-hidden object-fit-fill"
    >
      <Carousel.Item className=" ">
        <Image
          className="d-block w-100 h-100 object-fit-cover"
          src={ABC}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>
            星巴克史上最強聯名！日本「星巴克Ｘ史努比」首度強勢合作,23款高質感「保溫瓶、隨身瓶、T恤」官網獨家上市,簡約百搭整套買起來
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100 h-100 object-fit-cover"
          src={CBA}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>
            新店人等不及！新店裕隆城「誠品生活新店」9大亮點必看，搶先曝光「30米挑高天井書店、花園露台」新店人要朝聖。
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100 object-fit-cover h100"
          src={QQQ}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>
            挽肉與米開了！赤峰街「挽肉與米」菜單價位搶先看，一份650元「三顆手工漢堡排」鐵粉先衝中山站朝聖。
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
