import React, { useEffect } from 'react';
import style from './CartItem.module.css';
import { MdOutlineClear } from 'react-icons/md';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/use-products';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../data/API';

export default function CartItem({
  product,
  product: { productId, quantity, title, price, photo, isChecked, isSoldOut },
  allChecked,
  getIsSoldOut,
  setGetSoldOutId,
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const { isLoading, data: products } = useQuery(['products'], getProducts);
  const hasGetProducts = products && products.length > 0;
  const getProduct = products && products.filter((item) => item.id === productId)[0];

  useEffect(() => {
    let newAllChecked = allChecked;
    if (hasGetProducts) {
      const { isSoldOut: getSoldOut } = getProduct;
      addOrUpdateItem.mutate({
        ...product,
        isChecked: newAllChecked,
        isSoldOut: getSoldOut,
      });
    }
  }, [allChecked]);

  const navigate = useNavigate();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => !isSoldOut && addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => !isSoldOut && removeItem.mutate(productId);

  const handleBuyClick = () => {
    if (isSoldOut) {
      alert('품절된 상품입니다!');
      return;
    }
    navigate('/mybuy', { state: product });
  };

  const handleChecked = () => {
    let newChecked = !product.isChecked;
    addOrUpdateItem.mutate({ ...product, isChecked: newChecked });
    console.log('child - clicked!!!!');
  };

  // isSoldOut && getIsSoldOut(productId);

  useEffect(() => {
    isSoldOut &&
      setGetSoldOutId((getSoldOutId) => {
        return [...getSoldOutId, productId];
      });
  }, [setGetSoldOutId]);

  return (
    <li className={isSoldOut ? style.soldout : style.item}>
      <div className={style.itme__info}>
        <input type="checkbox" checked={isChecked} onChange={handleChecked} disabled={isSoldOut} />
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
        <button onClick={handleBuyClick}>주문하기</button>
      </div>
    </li>
  );
}
