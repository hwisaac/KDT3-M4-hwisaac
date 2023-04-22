import React, { useState } from 'react';
import style from './CheckBoxSecond.module.css';

const CheckBoxSecond = ({ id }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <label htmlFor={id} className={style.label}>
      <input type="checkbox" id={id} name={id} className={style.input} checked={checked} onChange={onChange} />
      <p className={style.p}></p>
    </label>
  );
};
export default CheckBoxSecond;
