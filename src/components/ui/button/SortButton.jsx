import React from 'react';
import style from './sortButton.module.css';
import { useState } from 'react';

const SortButton = ({ filters, onFilterChange }) => {
  const [select, setSelect] = useState('정확도순');

  return (
    <ul className={style.btns}>
      {filters.map((filter, index) => (
        <li className={filter === select ? style.btn_select : style.btn_wrap} key={index}>
          <button
            className={style.btn}
            onClick={() => {
              onFilterChange(filter);
              setSelect(filter);
            }}
          >
            {filter}
          </button>
        </li>
      ))}
    </ul>
  );
};


export default SortButton;