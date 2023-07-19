import { useState, useEffect } from 'react';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SelectArea from '@/components/reservation/select';
import Main from '@/components/reservation/main';
import { useRouter } from 'next/router';

export default function BookingPage() {

  const router = useRouter();

  // 篩選器 - 預設值(default)
  let totalKeyword = {
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
  const [keyword, setKeyword] = useState(totalKeyword)


  useEffect(() => {
    if (router.query) {

      // 取得router 食物類別category
      if (router.query.foodtype) {
        const arrfoodtype = router.query.foodtype.split(',');
        totalKeyword.foodtype.forEach((v, i) => {
          if (arrfoodtype.includes(v.name)) {
            v.selected = true;
          }
        }
        )
      }

      //取得router 城市city
      if (router.query.city) {
        totalKeyword.city = router.query.city;
      }

      //取得router 區域dist
      if (router.query.dist) {
        const arrdist = router.query.dist.split(',')
        totalKeyword.dist = arrdist;
      }

      //取得router 價格price
      if (router.query.price) {
        const arrprice = router.query.price.split(',')
        totalKeyword.price = arrprice;
      }
      setKeyword(totalKeyword)
      
    }
  }, [router.query])


  return (
    <>
      <div className={style.body}>
        <TopDiv />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SelectArea keyword={keyword} setKeyword={setKeyword}/>
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
