import React from 'react';
import style from './sortButton.module.css';

const SortButton = ({filters, onFilterChange}) => {
  return (
    <ul className={style.btns}>
      {filters.map((filter, index) => (
      <li className={style.btn_wrap} key={index}>
        <button className={style.btn} onClick={()=>onFilterChange(filter)}>{filter}</button>
      </li>))}
    </ul>
  );
}

export default SortButton;

