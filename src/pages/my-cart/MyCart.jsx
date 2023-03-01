import React, { useEffect } from 'react';
import CartItem from '../../components/my-cart/CartItem';
import PriceCard from '../../components/my-cart/PriceCard';
import { BiPlus } from 'react-icons/bi';
import { GrHome } from 'react-icons/gr';
import style from './MyCart.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import SmallButton from '../../components/ui/button/SmallButton';

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
    removeItem,
    addOrUpdateItem,
  } = useCart();
  const navigate = useNavigate();

  const [getSoldOutId, setGetSoldOutId] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  /** 개별상품 체크 */
  const handleCheck = (productId) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [productId]: !prevItems[productId],
    }));
  };

  /** 전체상품 체크 */
  const handleSelectAll = () => {
    const selectAll = !selectAllChecked;
    const updatedItems = products.reduce((acc, item) => {
      acc[item.productId] = selectAll;
      return acc;
    }, {});
    setSelectedItems(updatedItems);
    setSelectAllChecked(selectAll);
  };

  useEffect(() => {
    if (Object.keys(selectedItems).length === 0) {
      setSelectAllChecked(false);
    } else if (Object.keys(selectedItems).length === products?.length) {
      const allValues = Object.values(selectedItems);
      setSelectAllChecked(allValues.every((value) => value === true));
    }
  }, [selectedItems]);

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const checkedItems = products && products.filter((item) => selectedItems[item.productId] && !item.isSoldOut);
  const shippingPrice = selectedItems.length !== 0 ? SHIPPING : 0;
  const numberCheckedItems = checkedItems.length;
  const totalChecked = products.length;
  const soldOutItem = getSoldOutId.length;
  const totalPrice = checkedItems.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

  /** 구매페이지 이동 */
  const handleToBuy = (event) => {
    event.preventDefault();
    const buyProduct = products.filter((item) => selectedItems[item.productId] && !item.isSoldOut);
    if (buyProduct.length === 0) {
      alert('주문하실 상품을 선택해 주세요.');
    } else if (soldOutItem > 0) {
      alert('품절된 상품은 구매가 불가능합니다.');
    } else {
      navigate('/mybuy', { state: buyProduct });
    }
  };

  /** 선택삭제 */
  const handleSelectDeleteClick = () => {
    const selected = products && products.filter((item) => selectedItems[item.productId] && !item.isSoldOut);
    selected.map((product) => removeItem.mutate(product.productId));
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
            <div className={style.titleInput}>
              <input type="checkbox" id="title" checked={selectAllChecked} onChange={handleSelectAll} />
              <label htmlFor="title">프레시멘토</label>
              <GrHome />
            </div>
            <SmallButton text="선택 삭제" onClick={handleSelectDeleteClick} />
          </div>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem
                  key={product.productId}
                  product={product}
                  setGetSoldOutId={setGetSoldOutId}
                  onChange={() => handleCheck(product.productId)}
                  checked={selectedItems[product.productId]}
                />
              ))}
          </ul>
          <div className={style.totalPrice}>
            <PriceCard text="선택상품금액" price={totalPrice} />
            <BiPlus className={style.icons} />
            <PriceCard text="총 배송비" price={shippingPrice} />
            <PriceCard text="주문 금액" price={totalPrice + SHIPPING} />
            <button className={totalChecked !== 0 ? style.btn : style.disabledBtn} onClick={handleToBuy}>
              프레시멘토 {numberCheckedItems}건 주문하기
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
