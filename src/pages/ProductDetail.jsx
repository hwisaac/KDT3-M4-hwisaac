import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './ProductDetail.module.css';
import { getProductDetail } from '../components/total-product/fetch';
import { useState, useEffect } from 'react';
import Button from '../components/ui/button/Button';
import { addOrUpdateToCart } from '../api/firebase';
import { login } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const cookie = document.cookie;
    const userInfo = cookie.split(';');
    console.log('userInfo:', userInfo);
    const email = userInfo[1].split('=')[1];
    const password = userInfo[2].split('=')[1];
    console.log('password', password);
    login(email, password).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    const details = getProductDetail(id);
    details.then((data) => {
      console.log('fetching...');
      console.log('data:', data);
      setDetail(data);
    });
  }, [id]);

  console.log('detail:', detail);
  const { id: productId, title, photo, price, description } = detail;

  const handleClick = (e) => {
    const product = { productId, title, photo, price, quantity: 1 };
    addOrUpdateToCart(user.displayName, product);
    console.log('장바구니 추가');
    navigate(`/mycart`);
  };

  return (
    <section className={style.item}>
      <img className={style.img} src={photo} alt={title} />
      <div className={style.info}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.price}>{price?.toLocaleString() || Number(price).toLocaleString()}원</p>
        <p className={style.description}>{description}</p>
        <div className={style.btns}>
          <Button text="구매하기" onClick={handleClick} />
          <Button text="장바구니" onClick={handleClick} />
        </div>
      </div>
    </section>
  );
}
