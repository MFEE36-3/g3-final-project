import { useState } from 'react';
import Carousel from '@/components/reservation/topdiv/carousel';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SliderBar from '@/components/reservation/select/sliderbar';
import SelectArea from '@/components/reservation/select';
import ToggleButtonGroup from '@/components/reservation/reservationPage/switchbar';
import Main from '@/components/reservation/main';
import { useRouter } from 'next/router';

export default function BookingPage() {

  const router = useRouter();

  let outerKeyword =
  {
    foodtype: [
      { id: 1, name: '中式', selected: false },
      { id: 2, name: '日式', selected: false },
      { id: 3, name: '美式', selected: false },
      { id: 4, name: '泰式', selected: false },
      { id: 5, name: '韓式', selected: false },
      { id: 6, name: '西式', selected: false },
    ],
    city: "",
    dist: [],
    price: [0, 1200]
  }

  if (router.query) {

    if (router.query.foodtype) {
      const arr1 = router.query.foodtype.split(',')
      outerKeyword.foodtype.forEach((v, i) => {
        if (arr1.includes(v.name)) {
          v.selected = true;
        }
      } 
      )
    }
  }
  // 還沒寫完
  console.log(outerKeyword);


  const [keyword, setKeyword] = useState(outerKeyword||{
    foodtype: [
      { id: 1, name: '中式', selected: false },
      { id: 2, name: '日式', selected: false },
      { id: 3, name: '美式', selected: false },
      { id: 4, name: '泰式', selected: false },
      { id: 5, name: '韓式', selected: false },
      { id: 6, name: '西式', selected: false },
    ],
    city: "",
    dist: [],
    price: [0, 1200]
  })

  return (
    <>
      <div className={style.body}>
        <TopDiv />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SelectArea keyword={keyword} setKeyword={setKeyword} />
            </div>
            <div className="col-10">
              <Main keyword={keyword} setKeyword={setKeyword} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
