import { useState, useEffect } from 'react';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SelectArea from '@/components/reservation/select';
import Main from '@/components/reservation/main';
import { useRouter } from 'next/router';

export default function Reservation() {

  const router = useRouter();

  //加入收藏
  const [favorite,setFavorite] = useState(0);

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
    price: [0, 1200],
    searchkeyword:""
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
      //取得router 關鍵字searchkeyword
      if (router.query.searchkeyword) {
        totalKeyword.searchkeyword = router.query.searchkeyword;
      }
      setKeyword(totalKeyword)
      
    }
  }, [router.query])

  console.log(router)

  return (
    <>
      <div className={style.body}>
        <TopDiv keyword={keyword} setKeyword={setKeyword}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SelectArea keyword={keyword} setKeyword={setKeyword}/>
            </div>
            <div className="col-10">
              <Main keyword={keyword} setKeyword={setKeyword} favorite={favorite} setFavorite={setFavorite}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
