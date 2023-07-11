import SelectBar from './area';
import CheckBox from './checkbox';
import SliderBar from './sliderbar';
import SidebarBtn from './sidebarbtn';
import Btn from '@/components/common/btn';
import style from '@/styles/reservation/style.module.css';
import { useState } from 'react';

export default function SelectArea() {
  const initialtypes = [
    { id: 1, name: '中式', selected: false },
    { id: 2, name: '日式', selected: false },
    { id: 3, name: '美式', selected: false },
    { id: 4, name: '泰式', selected: false },
    { id: 5, name: '韓式', selected: false },
    { id: 6, name: '西式', selected: false },
  ];

  const [foodtypes, setFoodtypes] = useState(initialtypes);

  const handleFoodtypes = (id) => {
    setFoodtypes((prevFoodtypes) =>
      prevFoodtypes.map((id2) => {
        return id === id2.id ? { ...id2, selected: !id2.selected } : id2;
      })
    );
  };

  // cosnt [a,setA] = useState({
  //   selectbar:[{ id: 1, name: '中式', selected: false },
  //   { id: 2, name: '日式', selected: false },],
  //   checkbox:[],
  //   slidebar:[],
  // })

  // function sendData(){
  //   const data = {};
  //   data.city=a.selectbar.
  // }

  return (
    <>
      <div className={style.selectarea}>
        <div>
          <SelectBar />
        </div>
        <div>
          <CheckBox foodtypes={foodtypes} handleFoodtypes={handleFoodtypes}/>
        </div>
        <div>
          <SliderBar />
        </div>
        <Btn text="go!" />
        {/* <SidebarBtn /> */}
      </div>
    </>
  );
}
