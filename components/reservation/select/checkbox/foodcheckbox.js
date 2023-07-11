import { useState } from 'react';
import style from '@/styles/reservation/style.module.css';

export default function FoodCheckbox({foodtypes,handleFoodtypes}) {
  // const initialtypes = [
  //   { id: 1, name: '中式', selected: false },
  //   { id: 2, name: '日式', selected: false },
  //   { id: 3, name: '美式', selected: false },
  //   { id: 4, name: '泰式', selected: false },
  //   { id: 5, name: '韓式', selected: false },
  //   { id: 6, name: '西式', selected: false },
  // ];

  // const [foodtypes, setFoodtypes] = useState(initialtypes);

  // const handleButtonClick = (id) => {
  //   setFoodtypes((prevFoodtypes) =>
  //     prevFoodtypes.map((id2) => {
  //       return id === id2.id ? { ...id2, selected: !id2.selected } : id2;
  //     })
  //   );
  // };

  return (
    <div className="mx-auto">
      <div className="d-flex justify-content-center row flex-wrap w-70">
        {foodtypes.map((v) => {
          const { id, name, selected } = v;
          return (
            <div className="col-4" key={id}>
              <button
                className={`${style.selectbutton} ${
                  selected ? style.buttonon : style.buttonoff
                }`}
                key={id}
                id={id}
                value={name}
                onClick={(e) => {
                  handleFoodtypes(id);
                }}
              >
                {name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
