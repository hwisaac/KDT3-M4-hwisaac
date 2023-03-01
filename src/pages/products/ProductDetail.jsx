import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './ProductDetail.module.css';
import { getProductDetail } from '../../api/productApi';
import Button from '../../components/ui/button/Button';
import { addOrUpdateToCart } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { BsCartX } from 'react-icons/bs';
import { viewedListState } from '../../recoil/viewedListState';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { BiHeartCircle } from 'react-icons/bi';
import styled from 'styled-components';
import useCart from '../../hooks/useCart';

const SHIPPING = 3000;
export default function ProductDetail() {
  const {
    cartQuery: { data: cartItems },
    removeItem,
    addOrUpdateItem,
  } = useCart();
  const [heart, setHeart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userName = userInfo.displayName;
  const { id } = useParams();
  const navigate = useNavigate();
  // const [detail, setDetail] = useState([]);
  // const { id: productId, title, photo, price, description, isSoldOut } = detail;

  //최근 본 상품 목록 recoil에 저장
  const setViewedList = useSetRecoilState(viewedListState);

  const { isLoading, data: detail } = useQuery(
    [id],
    () => {
      return getProductDetail(id);
    },
    {
      onSuccess: (data) => {
        setViewedList((prevArr) => [
          {
            id: data.id,
            title: data.title,
            photo: data.photo,
          },
          ...prevArr,
        ]);
      },
    },
  );

  if (isLoading) return <LoadingModal />;
  const { id: productId, title, photo, price, description, isSoldOut } = detail;

  const handleClickCart = () => {
    if (!isLoggedIn) {
      const result = window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      if (result === true) window.location = '/login';
    } else {
      const product = { productId, title, photo, price, isSoldOut, quantity: 1 };
      if (cartItems.some((item) => item.productId === productId)) {
        const result = window.confirm(`장바구니에 동일한 상품이 있습니다.\n장바구니로 이동하시겠습니까?`);
        if (result === true) navigate(`/mycart`);
      } else {
        addOrUpdateToCart(userName, product);
        const result = window.confirm(`장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?`);
        if (result === true) navigate(`/mycart`);
      }
    }
  };

  // 구매하기
  const handleClickBuy = (e) => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      window.location = '/login';
    } else navigate(`/mybuy`, { state: [detail] });
  };

  //찜하기
  const handleClickKeepProducts = () => {
    if (!isLoggedIn) {
      const result = window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?');
      if (result === true) window.location = '/login';
    } else {
      setHeart((prev) => !prev);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={photo} alt={title} />
      </LeftContainer>
      <RightContainer>
        <Nav onClick={() => navigate(-1)}>← back to shop</Nav>
        <h2>{title}</h2>
        <Price>{price?.toLocaleString() || Number(price).toLocaleString()}원</Price>
        <Description>{description}</Description>
        {!isSoldOut ? (
          <BtnGroup>
            <SubBtn>
              <Button text="찜하기" onClick={handleClickKeepProducts} heart={heart} />
              <Button text="장바구니" onClick={handleClickCart} />
            </SubBtn>
            <Button text="구매하기" onClick={handleClickBuy} />
          </BtnGroup>
        ) : (
          <BtnGroup className={style.isSoldOut}>
            <BsCartX className={style.icons} />
            <p className={style.soldOutDescription}>이 상품은 현재 구매하실 수 없는 상품 입니다.</p>
          </BtnGroup>
        )}
      </RightContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  max-width: 1200px;
  gap: 7rem;
  justify-content: space-between;
  margin: 3rem auto;
`;

const LeftContainer = styled.div`
  width: 50%;
  img {
    width: 100%;
  }
`;

const Nav = styled.p`
  color: var(--color-gray1);
  font-size: 0.75rem;
  cursor: pointer;
`;

const RightContainer = styled.div`
  width: 50%;
  h2 {
    padding: 0.5em 0;
    margin-top: 1.25rem;
    font-size: 1.5rem;
  }
`;

const Price = styled.p`
  margin: 1.5rem 0;
`;

const Description = styled.p`
  color: var(--color-gray1);
  width: 90%;
  font-size: 0.75rem;
  padding: 1rem 0;
  line-height: 1.5rem;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SubBtn = styled.div`
  display: flex;
  gap: 0.5rem;
  /* width: 100%; */
`;
