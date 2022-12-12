import React from 'react';
import style from './Button.module.css';

export default function Button({ text, onClick }) {
  return (
    <button className={style.btn} onClick={onClick}>
      {text}
    </button>
  );
}
