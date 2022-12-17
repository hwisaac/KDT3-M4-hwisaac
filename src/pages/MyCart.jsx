import React from 'react';
import CartItem from '../components/CartItem/CartItem';
import PriceCard from '../components/PriceCard/PriceCard';
import { BiPlus } from 'react-icons/bi';
import { GrHome } from 'react-icons/gr';
import style from './MyCart.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const SHIPPING = 3000;

export default function MyCart() {
  const [allChecked, setAllChecked] = useState(true);
  // const [childChecked, setChildChecked] = useState(true);

  const {
    cartQuery: { isLoading, data: products },
    addOrUpdateItem,
  } = useCart();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + current.price * current.quantity, 0);

  const handleChecked = () => {
    console.log('totalClicked - clicked');
    setAllChecked((prev) => !prev);
  };

  const totalChecked = products && products.filter((product) => product.isChecked).length;
  const isAllChecked = totalChecked === products.length;

  const handleToBuy = () => {
    const buyItem = products.filter((product) => product.isChecked === true);
    if (buyItem.length === 0) {
      alert('주문하실 상품을 선택해 주세요.');
    }
    navigate('/mybuy', { state: buyItem });
  };

  return (
    <section className={style.myCart}>
      <h2 className={style.h2}>장바구니</h2>
      {!hasProducts && (
        <div>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
          <button>
            <Link to="/">쇼핑 계속하기</Link>
          </button>
        </div>
      )}
      {hasProducts && (
        <article className={style.container}>
          <div className={style.title}>
            <input
              type="checkbox"
              id="title"
              checked={(isAllChecked && allChecked) || (!allChecked && isAllChecked)}
              onChange={handleChecked}
            />
            <label htmlFor="title">프레시멘토</label>
            <GrHome />
          </div>
          <ul>
            {products &&
              products.map((product) => <CartItem key={product.productId} product={product} allChecked={allChecked} />)}
          </ul>
          <div className={style.totalPrice}>
            <PriceCard text="선택상품금액" price={totalPrice} />
            <BiPlus className={style.icons} />
            <PriceCard text="총 배송비" price={SHIPPING} />
            <PriceCard text="주문 금액" price={totalPrice + SHIPPING} />
            <button className={totalChecked !== 0 ? style.btn : style.disabledBtn} onClick={handleToBuy}>
              프레시멘토 {totalChecked}건 주문하기
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
