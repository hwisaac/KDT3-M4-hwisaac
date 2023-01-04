import React from 'react';
import { Link } from 'react-router-dom';
import style from './BuyItem.module.css';

const BuyItem = ({ id, photo, title, quantity, price }) => {
  return (
    <tr className={style.wrap}>
      <td>
        <div className={style.productInfo}>
          <Link to={`/products/${id}`} state={{ id }}>
            <img src={photo} alt={title} />
          </Link>
          <div className={style.productTitle}>
            <p>[스마트스토어] 프레시멘토</p>
            <Link to={`/products/${id}`} state={{ id }}>
              <strong>{title}</strong>
            </Link>
          </div>
        </div>
      </td>

      <td>프레시멘토</td>
      <td>{quantity}개</td>
      <td>{(price * quantity).toLocaleString()}원</td>
    </tr>
  );
};

export default BuyItem;
