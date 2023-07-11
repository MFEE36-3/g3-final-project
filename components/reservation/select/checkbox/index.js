import FoodCheckbox from './foodcheckbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '@/styles/reservation/style.module.css';
export default function CheckBox({foodtypes,handleFoodtypes}) {
  return (
    <>
      <p>餐廳類別</p>
      <hr />
      <div className={`${style.spaceevenly} ${style.mb20}`}>
        <FoodCheckbox foodtypes={foodtypes} handleFoodtypes={handleFoodtypes}/>
      </div>
    </>
  );
}
