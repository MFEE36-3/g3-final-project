import FoodCheckbox from './foodcheckbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '@/styles/reservation/style.module.css';
export default function CheckBox() {
  return (
    <>
      <p>餐廳類別</p>
      <hr />
      <div className={style.spaceevenly}>
        <FoodCheckbox />
      </div>
    </>
  );
}
