import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button/Button';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const {
    state: { id, title, img, price },
  } = useLocation();
  const handleClick = (e) => {
    // 여기서 장바구니에 추가하면 됨!
  };
  return (
    <section className={styles.item}>
      <img className={styles.img} src={img} alt={title} />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.price}>{price.toLocaleString()}원</p>
        <button className={styles.btn}>구매하기</button>
        <div className={styles.btns}>
          <Button text="장바구니" onClick={handleClick} />
          <Button text="찜하기" onClick={handleClick} />
        </div>
      </div>
    </section>
  );
}
