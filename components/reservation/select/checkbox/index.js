import FoodCheckbox from './foodcheckbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '@/styles/reservation/style.module.css';


export default function CheckBox({ keyword, setKeyword, handleFoodtypes }) {
  return (
    <>
      <p className={style.selecttitle}>餐廳類別</p>
      <hr />
      <div className={`${style.spaceevenly} ${style.mb20}`}>
        <FoodCheckbox keyword={keyword} setKeyword={setKeyword} handleFoodtypes={handleFoodtypes} />
      </div>
    </>
  );
}
