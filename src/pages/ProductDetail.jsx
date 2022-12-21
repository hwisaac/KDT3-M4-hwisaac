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
import { BsCartX } from 'react-icons/bs';

const SHIPPING = 3000;
export default function ProductDetail() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userName = userInfo.displayName;
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const details = getProductDetail(id);
    details.then((data) => {
      setDetail(data);
    });
  }, [id]);
  console.log('detail:', detail);
  const { id: productId, title, photo, price, description, isSoldOut } = detail;

  const handleClickCart = (e) => {
    if (!isLoggedIn) {
      const result = window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      if (result === true) window.location = '/login';
    } else {
      const product = { productId, title, photo, price, isSoldOut, quantity: 1, isChecked: true };
      addOrUpdateToCart(userName, product);
      const result = window.confirm(`장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?`);
      if (result === true) navigate(`/mycart`);
    }
  };

  // 구매하기
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
        <div className={style.shipping}>
          <p className={style.shippingTitle}>택배배송</p>
          <p className={style.shippingPrice}>{SHIPPING.toLocaleString()}원 (주문시 결제)</p>
        </div>
        {!isSoldOut ? (
          <div className={style.btns}>
            <Button text="구매하기" onClick={handleClickBuy} />
            <Button text="장바구니" onClick={handleClickCart} />
          </div>
        ) : (
          <div className={style.isSoldOut}>
            <BsCartX className={style.icons} />
            <p className={style.soldOutDescription}>이 상품은 현재 구매하실 수 없는 상품 입니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
