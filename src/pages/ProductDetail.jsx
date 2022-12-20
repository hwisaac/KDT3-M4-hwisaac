import React from 'react';
import { useParams } from 'react-router-dom';
import style from './ProductDetail.module.css';
import { getProductDetail } from '../components/total-product/fetch';
import { useState, useEffect } from 'react';
import Button from '../components/ui/button/Button';
import { addOrUpdateToCart } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../data/LoginData';

export default function ProductDetail() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userName = userInfo.displayName;
  console.log('userInfo:', userInfo);
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const details = getProductDetail(id);
    details.then((data) => {
      setDetail(data);
    });
  }, [id]);

  const { id: productId, title, photo, price, description } = detail;

  const handleClickCart = (e) => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      window.location = '/login';
    } else {
      const product = { productId, title, photo, price, quantity: 1, isChecked: true };
      addOrUpdateToCart(userName, product);
      console.log('장바구니 추가');
      navigate(`/mycart`);
    }
  };

  const handleClickBuy = (e) => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      window.location = '/login';
    } else navigate(`/mybuy`, { state: detail });
  };

  return (
    <section className={style.item}>
      <img className={style.img} src={photo} alt={title} />
      <div className={style.info}>
        <h2 className={style.title}>{title}</h2>
        <p className={style.price}>{price?.toLocaleString() || Number(price).toLocaleString()}원</p>
        <p className={style.description}>{description}</p>
        <div className={style.btns}>
          <Button text="구매하기" onClick={handleClickBuy} />
          <Button text="장바구니" onClick={handleClickCart} />
        </div>
      </div>
    </section>
  );
}
