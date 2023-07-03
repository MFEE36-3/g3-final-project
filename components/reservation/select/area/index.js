import SelectItem from './dist';
import BasicSelect from './city';
import style from '@/styles/reservation/style.module.css';

export default function SelectBar() {
  return (
    <div className={style.mb20}>
      <p>地區</p>
      <hr />
      <div className={style.mb10}>
        <BasicSelect />
      </div>
      <div>
        <SelectItem />
      </div>
    </div>
  );
}
