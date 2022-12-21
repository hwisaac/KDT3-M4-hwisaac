import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './ProductDetail.module.css';
import { getProductDetail } from '../data/API';
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

  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();

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
    }
    const product = { productId, title, photo, price, quantity: 1, isChecked: true };
    addOrUpdateToCart(userName, product);
    console.log('장바구니 추가');
    navigate(`/mycart`);
  };

  // 구매하기
  const handleClickBuy = (e) => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      window.location = '/login';
    }
    navigate(`/mybuy`, { state: detail });
    // detail받아와서
    // product를 구매하기 페이지로 넘어가게 해줄 수 있는 함수
    // navigate(`/butpage`); -> 구매하기 페이지로 이동
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
