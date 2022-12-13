import React from 'react';
import style from './SearchItem.module.css';
import { useNavigate } from 'react-router-dom';

const SearchItem = ({ id, img, title, price, description }) => {
  const navigate = useNavigate();

  return (
    <li
      className={style.item}
      onClick={() => {
        navigate(`/products/${id}`, { state: { id, title, img, price } });
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
        <button>찜</button>
      </div>
    </li>
  );
};

export default SearchItem;
