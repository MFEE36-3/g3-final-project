import SelectBar from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import SidebarBtn from './sidebarbtn';
import Btn from '@/components/common/btn';
import style from '@/styles/reservation/style.module.css';

export default function SelectArea() {
  return (
    <>
      <div className={style.selectarea}>
        <div>
          <SelectBar />
        </div>
        <div>
          <CheckBox />
        </div>
        <div>
          <SliderBar />
        </div>
        <Btn text="go!"/>
        {/* <SidebarBtn /> */}
      </div>
    </>
  );
}
