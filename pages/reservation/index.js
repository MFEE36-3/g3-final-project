import { useState, useEffect, createContext } from 'react';
import TopDiv from '@/components/reservation/topdiv';
import style from '@/styles/reservation/style.module.css';
import SelectArea from '@/components/reservation/select';
import Main from '@/components/reservation/main';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const auth = createContext()
export default function Reservation() {

  const router = useRouter();
  // const [token, setToken] = useState({})
  //加入收藏
  const [favorite, setFavorite] = useState([0]);
  const [rwd,setRwd] = useState(false);

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
    star: "",
    searchkeyword: ""
  }
  const [keyword, setKeyword] = useState(totalKeyword)

  useEffect(() => {

    if (localStorage.getItem('auth')) {
      const member = JSON.parse(localStorage.getItem('auth'));

      fetch(`${process.env.API_SERVER}/reservation/favoritelist/${member?.sid}`)
        .then(r => r.json())
        .then(data => {
          // console.log(data)

          const newFav = data.rows.map(v => v.shop_id);
          setFavorite(prev => newFav)
        })
    }


  }, [])


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

      //取得router 評分star
      if (router.query.star) {
        totalKeyword.star = router.query.star;
      }

      //取得router 關鍵字searchkeyword
      if (router.query.searchkeyword) {
        totalKeyword.searchkeyword = router.query.searchkeyword;
      }
      setKeyword(totalKeyword)

      // 取得收藏店家資訊
      if (localStorage.getItem('auth')) {
        const member = JSON.parse(localStorage.getItem('auth'));

        fetch(`${process.env.API_SERVER}/reservation/favoritelist/${member?.sid}`)
          .then(r => r.json())
          .then(data => {
            // console.log(data)

            const newFav = data.rows.map(v => v.shop_id);
            setFavorite(prev => newFav)
          })
      }

    }
  }, [router.query])


  return (
    <>
      <Head>
        <title>食GOEAT! / 訂位外帶</title>
      </Head>
      <div className={style.body}>
        <TopDiv keyword={keyword} setKeyword={setKeyword} rwd={rwd} setRwd={setRwd}/>
        {/* <div className="container-fluid">
          <div className={`${style.contentdiv} row `}>
            <div className={`${style.rwdarea} col-2`}>
              <SelectArea keyword={keyword} setKeyword={setKeyword}/>
            </div>
            <div className="col-10">
              <Main keyword={keyword} setKeyword={setKeyword} favorite={favorite} setFavorite={setFavorite}/>
            </div>
          </div>
        </div> */}
        <div className="container-fluid">
          <div className={ rwd ? style.contentdiv : style.contentdivflex }>
            <div className={rwd ? style.leftdivactive:style.leftdiv }>
              <SelectArea keyword={keyword} setKeyword={setKeyword} />
            </div>

            <div className={style.rightdiv}>
              <Main keyword={keyword} setKeyword={setKeyword} favorite={favorite} setFavorite={setFavorite} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
