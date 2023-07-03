import SelectBar from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import Btn from '@/components/common/btn';
import style from '@/styles/reservation/style.module.css';

export default function SelectArea() {
  return (
    <>
      <div className={style.selectarea}>
        {/* style={{display:"flex", justifyContent:"center" ,flexFlow:"column"}} */}
        <div>
          <SelectBar />
        </div>
        <div>
          <CheckBox />
        </div>
        <div>
          <SliderBar />
        </div>
        {/* <Btn /> */}
      </div>
    </>
  );
}
