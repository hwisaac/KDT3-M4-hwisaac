import React, { useEffect } from 'react';
import style from './CartItem.module.css';
import { MdOutlineClear } from 'react-icons/md';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

export default function CartItem({
  product,
  product: { productId, quantity, title, price, photo, isChecked },
  allChecked,
}) {
  const { addOrUpdateItem, removeItem } = useCart();

  useEffect(() => {
    let newAllChecked = allChecked;
    addOrUpdateItem.mutate({ ...product, isChecked: newAllChecked });
  }, [allChecked]);

  const navigate = useNavigate();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  const handlePlus = () => addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(productId);

  const handleClick = () => {
    navigate('/mybuy', { state: product });
  };

  const handleChecked = () => {
    let newChecked = !product.isChecked;
    addOrUpdateItem.mutate({ ...product, isChecked: newChecked });
    console.log('child - clicked!!!!');
  };

  return (
    <li className={style.item}>
      <div className={style.itme__info}>
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
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
