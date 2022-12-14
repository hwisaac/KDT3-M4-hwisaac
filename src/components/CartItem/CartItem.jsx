import React from 'react';
import style from './CartItem.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MdOutlineClear } from 'react-icons/md';
import { addOrUpdateToCart, removeFromCart } from '../../api/firebase';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

export default function CartItem({ product, product: { productId, quantity, title, price, photo }, username }) {
  const queryClient = useQueryClient();

  const addOrUpdateItem = useMutation((product) => addOrUpdateToCart(username, product), {
    onSuccess: () => queryClient.invalidateQueries(['carts', username]),
  });

  const removeItem = useMutation((productId) => removeFromCart(username, productId), {
    onSuccess: () => queryClient.invalidateQueries(['carts', username]),
  });

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 }, { onSuccess: () => console.log('success!!!') });
  };
  const handlePlus = () => addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(productId);

  const handleClick = () => {
    // 해당 아이템 구매페이지로 이동
  };

  return (
    <li className={style.item}>
      <div className={style.itme__info}>
        <input type="checkbox" name="" id="" />
        <img className={style.image} src={photo} alt={title} />
        <div className={style.card}>
          <div>
            <p className={style.title}>{title}</p>
            <p className={style.price}>{`${price.toLocaleString()}원`}</p>
          </div>
          <MdOutlineClear className={style.deleteBtn} onClick={handleDelete} />
        </div>
      </div>
      <div className={style.updateItem}>
        <CiSquareMinus className={style.icons} onClick={handleMinus} />
        <span className={style.quantity}>{quantity}</span>
        <CiSquarePlus className={style.icons} onClick={handlePlus} />
      </div>
      <div className={style.priceSection}>
        <p className={style.priceText}>상품금액</p>
        <p className={style.totalPrice}>{`${(price * quantity).toLocaleString()}원`}</p>
        <button onClick={handleClick}>주문하기</button>
      </div>
    </li>
  );
}
