import Dist from './dist';
import City from './city';
import style from '@/styles/reservation/style.module.css';

export default function Area({ keyword, setKeyword }) {
  return (
    <div className={style.mb20}>
      <p>地區</p>
      <hr />
      <div className={style.mb10}>
        <City keyword={keyword} setKeyword={setKeyword}/>
      </div>
      <div>
        <Dist keyword={keyword} setKeyword={setKeyword}/>
      </div>
    </div>
  );
}
