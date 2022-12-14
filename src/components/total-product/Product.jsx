import React from 'react';
import style from './Product.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ id, title, img, price }) => {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  function onClick() {
    setHeart((cur) => !cur);
  }

  return (
    <li
      className={style.wrap}
      onClick={() => {
        navigate(`/products/${id}`, { state: { id, title, img, price } });
      }}
    >
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
          <span className={style.rower_price}>{price.toLocaleString()}원</span>
          <span className={style.price}>20,000원</span>
          <span className={style.sale}>30%</span>
        </p>
      </div>
    </li>
  );
};

export default Product;
