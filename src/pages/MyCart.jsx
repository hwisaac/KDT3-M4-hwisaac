import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import CartItem from '../components/CartItem/CartItem';
import PriceCard from '../components/PriceCard/PriceCard';
import { BiPlus } from 'react-icons/bi';
import { GrHome } from 'react-icons/gr';
import styles from './MyCart.module.css';

const SHIPPING = 3000;

export default function MyCart() {
  const username = 'no1';

  const { isLoading, data: products } = useQuery(['carts', username || ''], () => getCart(username), {
    enabled: !!username,
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(products.length);
  console.log('products:', products);
  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + current.price * current.quantity, 0);

  return (
    <section className={styles.myCart}>
      <h2 className={styles.h2}>장바구니</h2>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <article className={styles.container}>
          <div className={styles.title}>
            <input type="checkbox" id="title" />
            <label htmlFor="title">프레시멘토</label>
            <GrHome />
          </div>
          <ul>
            {products &&
              products.map((product) => <CartItem key={product.productId} product={product} username={username} />)}
          </ul>
          <div className={styles.totalPrice}>
            <PriceCard text="선택상품금액" price={totalPrice} />
            <BiPlus className={styles.icons} />
            <PriceCard text="총 배송비" price={SHIPPING} />
            <PriceCard text="주문 금액" price={totalPrice + SHIPPING} />
            <button className={styles.btn}>프레시멘토 0건 주문하기</button>
          </div>
        </article>
      )}
    </section>
  );
}
