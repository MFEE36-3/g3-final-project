import { useState } from 'react';
import style from '@/styles/reservation/style.module.css';

export default function FoodCheckbox({keyword,handleFoodtypes}) {

  return (
    <div className="mx-auto">
      <div className="d-flex justify-content-center row flex-wrap w-70">
        {keyword.foodtype.map((v) => {
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
