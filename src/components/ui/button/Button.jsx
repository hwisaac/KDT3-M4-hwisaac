import React from 'react';
import style from './Button.module.css';

export default function Button({ text, onClick }) {
  return (
    <button className={text !== '구매하기' ? style.buyBtn : style.btn} onClick={onClick}>
      {text}
    </button>
  );
}
