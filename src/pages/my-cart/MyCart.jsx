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
import styled from 'styled-components';

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
  const freeShipping = totalPrice >= 30000 ? 0 : SHIPPING;

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
    <Container>
      <Title>Cart</Title>

      {!hasProducts && (
        <NoProduct>
          <SubTitle>Product</SubTitle>
          <Message>
            <p>장바구니가 비어있습니다.</p>
            <Link to="/">쇼핑 계속하기</Link>
          </Message>
        </NoProduct>
      )}
      {hasProducts && (
        <Article>
          <ProductContainer>
            <SubTitle>Product</SubTitle>
            <CheckboxContainer>
              <CustomCheckbox type="checkbox" id="title" checked={selectAllChecked} onChange={handleSelectAll} />
            </CheckboxContainer>
            <CartItemContainer>
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
            </CartItemContainer>
            <SmallButton text="선택 삭제" onClick={handleSelectDeleteClick} />
          </ProductContainer>
          <RightContainer>
            <PriceContainer>
              <SubTitle>Total</SubTitle>
              <PriceCardContainer>
                <PriceInfo>
                  <PriceCard text="Price" price={totalPrice} />
                  <PriceCard text="Shipping" price={freeShipping} />
                </PriceInfo>
                <ShipMsg>* 30,000원 이상 구매시 무료배송 혜택</ShipMsg>
                <TotalPrice>
                  <PriceCard text="Total" price={totalPrice && totalPrice + freeShipping} />
                </TotalPrice>
              </PriceCardContainer>
            </PriceContainer>
            <Button>Ordeing {numberCheckedItems} cases</Button>
          </RightContainer>
        </Article>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--white);
  color: var(--black);
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  max-width: 1000px;
  margin: 6rem auto 2rem;
  text-align: left;
  padding: 0 1rem;
`;

const CheckboxContainer = styled.div`
  padding-bottom: 1rem;
`;

const Article = styled.article`
  display: flex;
  max-width: 1000px;
  padding: 0 1rem;
  margin: auto;
  gap: 2rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #faf8f3;
  padding: 3rem;
  width: 50%;
`;

const CartItemContainer = styled.ul`
  padding: 2rem 0;
  border-top: 1px solid var(--gray);
  border-bottom: 1px solid var(--gray);
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #faf8f3;
  padding: 3rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h5`
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  border-bottom: 1px solid var(--gray);
  padding-bottom: 1.25rem;
  margin-bottom: 1rem;
`;

const PriceCardContainer = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const PriceInfo = styled.div`
  padding-bottom: 1rem;
`;

const TotalPrice = styled.div`
  padding: 1rem 0;
`;

const ShipMsg = styled.div`
  border-top: 1px solid var(--gray);
  border-bottom: 1px solid var(--gray);
  padding: 3rem 0;
  color: var(--brown);
`;

const Button = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  padding: 2rem 3rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: var(--black);
  color: var(--white);
  cursor: pointer;
  &:hover {
    filter: brightness(2);
    transition: filter 0.3s ease-in-out;
  }
  /* -webkit-transition: background-color 0.3s ease-in-out,border-color 0.3s ease-in-out,color 0.3s ease-in-out; */
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #deded3;

  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--brown);
  }
`;

const NoProduct = styled.div`
  max-width: 1000px;
  padding: 3.25rem;
  margin: 0 auto 2rem;
  text-align: left;
  background-color: var(--semi-gray);
  color: var(--black);
`;

const Message = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.75rem 0;
  padding: 3.25rem 0;
  text-align: center;
  background-color: transparent;
`;
