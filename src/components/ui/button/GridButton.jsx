import React from 'react';
import style from './GridButton.module.css';

const GridButton = ({ grid, setGrid, select, setSelect }) => {
  return (
    <li key={grid} className={grid === select ? style.grid_select : style.grid}>
      <button
        className={style[`${grid}_btn`]}
        onClick={() => {
          setGrid(grid);
          setSelect(grid);
        }}
      >
        {grid}
      </button>
    </li>
  );
};

export default GridButton;
