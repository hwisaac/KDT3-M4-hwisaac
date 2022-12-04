import React from 'react';
import style from './Product.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ title, img }) => {
  const [heart, setHeart] = useState(false);

  function onClick() {
    setHeart((cur) => !cur);
  }

  return (
    <li className={style.wrap}>
      <Link className={style.link} href="#">
        <img className={style.img} src={img} alt={title} />
        <div className={style.btns}>
          <button onClick={onClick} className={heart ? style.btn_heart__red : style.btn_heart}>
            찜
          </button>
          <button className={style.btn_detail}>상세</button>
        </div>
        <div className={style.txt}>
          <p className={style.title}>{title}</p>
          <button onClick={onClick} className={heart ? style.heart__red : style.heart}>
            찜
          </button>

          <p>
            <span className={style.rower_price}>13,900원</span>
            <span className={style.price}>20,000원</span>
            <span className={style.sale}>30%</span>
          </p>
        </div>
      </Link>
      <p className={style.rating}>평점 4.7 • 리뷰 6,842</p>
    </li>
  );
};

export default Product;
