import React from 'react';
import style from './Button.module.css';

export default function Button({ text, onClick, heart }) {
  return (
    <button className={text === '장바구니' ? style.cartBtn : style.btn} onClick={onClick}>
      {text}
      {text === '찜하기' && <span className={heart ? style.heartIcon_red : style.heartIcon }>찜</span>}
    </button>
  );
}
