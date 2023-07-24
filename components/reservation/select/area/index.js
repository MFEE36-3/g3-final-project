import Dist from './dist';
import City from './city';
import style from '@/styles/reservation/style.module.css';
import { useState, useEffect } from 'react';

export default function Area({ keyword, setKeyword }) {

  const [cdata, setCdata] = useState([]);
  const [ddata, setDdata] = useState([]);

  // 取得dist資料(判斷city後的資料)
  useEffect(() => {
    const getData = async () => {
      const r = await fetch(`${process.env.API_SERVER}/restaurants/dist`)
      const data = await r.json()
      
        const tpedist = data.rows.filter((v) => {
          if (keyword.city === v.cityname) {
            return v.areaname
          }
        })

        console.log(tpedist)
        setDdata(tpedist)
      }
  
    getData();

  }, [keyword.city])


  return (
    <div className={`${style.mb20}`}>
      <p>地區</p>
      <hr />
      <div className={style.mb10}>
        <City keyword={keyword} setKeyword={setKeyword} cdata={cdata} setCdata={setCdata} />
      </div>
      <div>
        <Dist keyword={keyword} setKeyword={setKeyword} ddata={ddata} setDdata={setDdata} />
      </div>
    </div>
  );
}
