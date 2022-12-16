import React from 'react';
import style from './PriceCard.module.css';

export default function PriceCard({ text, price }) {
  return (
    <div className={text === '주문 금액' ? style.border : style.card}>
      <p>{text}</p>
      <p>{`${price.toLocaleString()}원`}</p>
    </div>
  );
}
