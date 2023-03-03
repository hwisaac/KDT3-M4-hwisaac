import React, { useEffect } from 'react';
import CartItem from '../../components/my-cart/CartItem';
import PriceCard from '../../components/my-cart/PriceCard';
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
  console.log('products:', products);

  const hasProducts = products && products.length > 0;
  const checkedItems = products && products.filter((item) => selectedItems[item.productId] && !item.isSoldOut);
  const numberCheckedItems = checkedItems.length;
  const soldOutItem = getSoldOutId.length;
  const totalPrice = checkedItems.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);
  const shippingPrice = totalPrice >= 30000 ? 0 : SHIPPING;

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
      <h1 className="fah">CART</h1>

      {!hasProducts && (
        <NoProduct>
          <SubTitle className="fah">Product</SubTitle>
          <Message>
            <p>장바구니가 비어있습니다.</p>
            <Link to="/">쇼핑 계속하기</Link>
          </Message>
        </NoProduct>
      )}
      {hasProducts && (
        <Article>
          <LeftContainer>
            <SubTitle className="fah">Product</SubTitle>
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
            <SmallButton text="선택삭제" onClick={handleSelectDeleteClick} />
          </LeftContainer>
          <RightContainer>
            <PriceContainer>
              <SubTitle className="fah">Total</SubTitle>
              <PriceCardContainer>
                <PriceInfo>
                  <PriceCard text="Price" price={totalPrice} />
                  <PriceCard text="Shipping" price={shippingPrice} />
                </PriceInfo>
                <ShipMsg>* 30,000원 이상 구매시 무료배송 혜택</ShipMsg>
                <TotalPrice>
                  <PriceCard text="Total" price={totalPrice && totalPrice + shippingPrice} />
                </TotalPrice>
              </PriceCardContainer>
            </PriceContainer>
            <Button onClick={handleToBuy}>Ordeing {numberCheckedItems} cases</Button>
          </RightContainer>
        </Article>
      )}
    </Container>
  );
}

const Container = styled.section`
  background-color: var(--color-white);
  color: var(--color-black1);
  max-width: 1000px;
  margin: 3rem auto 8rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
  }
  h1 {
    font-size: 2.5rem;
    letter-spacing: 0.2rem;
    text-align: left;
    margin-bottom: 1rem;
  }
`;

const CheckboxContainer = styled.div`
  padding-bottom: 1rem;
`;

const Article = styled.article`
  display: flex;
  margin: auto;
  gap: 1.1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-beige);
  padding: 3rem;
  width: 45%;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const CartItemContainer = styled.ul`
  padding: 2rem 0;
  border-top: 1px solid var(--color-light-gray3);
  border-bottom: 1px solid var(--color-light-gray3);
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-beige);
  padding: 3rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h5`
  font-size: 1.75rem;
  font-weight: 400;
  border-bottom: 1px solid var(--color-light-gray3);
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
  border-top: 1px solid var(--color-gray1);
  border-bottom: 1px solid var(--color-light-gray3);
  padding: 2rem 0;
  color: var(--color-brown);
  font-size: 0.5rem;
`;

const Button = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  padding: 1rem 0;
  font-size: 1rem;
  text-align: center;
  background-color: var(--color-black1);
  color: var(--color-white);
  cursor: pointer;
  &:hover {
    filter: brightness(3);
    transition: filter 0.3s ease-in-out;
  }
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  background-color: var(--color-light-gray3);

  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-brown);
  }
`;

const NoProduct = styled.div`
  max-width: 1000px;
  padding: 2rem 0rem;
  margin: 0 auto 2rem;
  text-align: left;
  color: var(--color-black1);
  a {
    color: var(--color-brown);
  }
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
