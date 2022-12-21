import React from 'react';
import style from './SearchItem.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchItem = ({ id, img, title, price, description }) => {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  function onClick() {
    setHeart((cur) => !cur);
  }

  return (
    <li
      className={style.item}
      onClick={(e) => {
        if (e.target.nodeName !== 'BUTTON') {
          navigate(`/products/${id}`, { state: { id, title, img, price } });
        }
      }}
    >
      <div className={style.container}>
        <img className={style.img} src={img} alt={title} />
        <div>
          <p className={style.title}>{title}</p>
          <p className={style.price}>{price.toLocaleString()}원</p>
          <p className={style.description}>{description}...</p>
        </div>
      </div>

      <div>
        <button onClick={onClick} className={heart ? style.btn_heart__red : style.btn_heart}>
          찜
        </button>
      </div>
    </li>
  );
};

export default SearchItem;
