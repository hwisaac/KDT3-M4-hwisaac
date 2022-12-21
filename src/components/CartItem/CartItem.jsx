import React, { useEffect } from 'react';
import style from './CartItem.module.css';
import { MdOutlineClear } from 'react-icons/md';
import { CiSquareMinus } from 'react-icons/ci';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import SmallButton from '../ui/button/SmallButton';
import { getProducts } from '../../data/API';

export default function CartItem({
  product,
  product: { productId, quantity, title, price, photo, isChecked, isSoldOut },
  allChecked,
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
      setTimeout(() => {
        if (isSoldOut && allChecked) alert('품절된 상품이 있습니다.');
      }, 100);
    }
  }, [allChecked, isSoldOut]);

  const navigate = useNavigate();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => !isSoldOut && addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(productId);

  const handleBuyClick = () => {
    if (isSoldOut) {
      alert('품절된 상품입니다!');
      return;
    }
    navigate('/mybuy', { state: [product] });
  };

  const handleChecked = () => {
    let newChecked = !product.isChecked;
    addOrUpdateItem.mutate({ ...product, isChecked: newChecked });
  };

  const handleToProduct = (event) => {
    if (event.target.nodeName !== 'svg') navigate(`/products/${productId}`);
  };

  useEffect(() => {
    isSoldOut &&
      setGetSoldOutId((getSoldOutId) => {
        return [...getSoldOutId, productId];
      });
  }, [setGetSoldOutId]);

  return (
    <li className={isSoldOut ? style.soldout : style.item}>
      <div className={style.itme__info}>
        <input type="checkbox" className={style.checkbox} checked={isChecked} onChange={handleChecked} />
        <div className={style.item__desciption} onClick={handleToProduct}>
          <img className={style.image} src={photo} alt={title} />
          <div className={style.card}>
            <div className={style.cartInfo}>
              <p className={style.title}>{title}</p>
              <p className={style.price}>{`${price.toLocaleString()}원`}</p>
            </div>
            <MdOutlineClear className={style.deleteBtn} onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div className={style.updateItem}>
        <AiOutlineMinusSquare className={style.icons} onClick={handleMinus} />
        <span className={style.quantity}>{quantity}</span>
        <AiOutlinePlusSquare className={style.icons} onClick={handlePlus} />
      </div>
      <div className={style.priceSection}>
        <p className={style.priceText}>상품금액</p>
        <p className={style.totalPrice}>{`${(price * quantity).toLocaleString()}원`}</p>
        <SmallButton text="주문하기" onClick={handleBuyClick} />
      </div>
    </li>
  );
}
