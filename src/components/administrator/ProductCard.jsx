import React from 'react';
import style from './ProductCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ index, id, title, price, description, tags, isSoldOut, thumbnail }) => {
  // const [heart, setHeart] = useState(false);
  // const navigate = useNavigate();
  // function onClick() {
  //   setHeart((prev) => !prev);
  // }
  return (
    <li className={style.item}>
      <div className={style.left}>
        <input type="checkbox" />
        <span className={style.index}>{index + 1}</span>
        <img className={style.thumbnail} src={thumbnail} alt={title} />
        <p className={style.title}>{title}</p>
        <div className={style.tags}>
          {tags.map((tag) => (
            <span className={style.tag} key={`${id}-${tag}`}>{`#${tag}`}</span>
          ))}
        </div>
      </div>
      <div className={style.right}>
        <button className={style.btn}>수정</button>
        <button className={style.btn}>삭제</button>
      </div>
    </li>
  );
};

export default ProductCard;
