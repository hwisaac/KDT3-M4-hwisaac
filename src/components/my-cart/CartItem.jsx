import React, { useEffect } from 'react';
import style from './CartItem.module.css';
import { MdOutlineClear } from 'react-icons/md';
import { CiSquareMinus } from 'react-icons/ci';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import SmallButton from '../ui/button/SmallButton';
import { getProducts } from '../../api/productApi';
import styled from 'styled-components';

export default function CartItem({
  product,
  product: { productId, quantity, title, price, photo, isSoldOut },
  setGetSoldOutId,
  onChange,
  checked,
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const { isLoading, data: products } = useQuery(['products'], getProducts);
  const hasGetProducts = products && products.length > 0;
  const getProduct = products && products.filter((item) => item.id === productId)[0];

  useEffect(() => {
    if (hasGetProducts) {
      const { isSoldOut: getSoldOut } = getProduct;
      addOrUpdateItem.mutate({
        ...product,
        isSoldOut: getSoldOut,
      });
      setTimeout(() => {
        if (isSoldOut) alert('품절된 상품이 있습니다.');
      }, 100);
    }
  }, [isSoldOut]);

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
    <ProductCard isSoldOut>
      <CheckboxContainer>
        <CustomCheckbox type="checkbox" value={productId} onChange={onChange} checked={checked} />
      </CheckboxContainer>
      <ImageContainer onClick={handleToProduct}>
        <ProductImage src={photo} alt={title} />
      </ImageContainer>
      <Product>
        <Text>{title}</Text>
        <Text>{`${(price * quantity).toLocaleString()}원`}</Text>
        <Quantity>
          <HiMinusSm onClick={handleMinus} />
          <span>{quantity}</span>
          <HiOutlinePlusSm onClick={handlePlus} />
        </Quantity>
      </Product>
      <DeleteBtn>
        <MdOutlineClear onClick={handleDelete} />
      </DeleteBtn>
    </ProductCard>
  );
}

const ProductCard = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const CheckboxContainer = styled.div`
  position: relative;
  text-align: left;
  font-size: 1rem;
  width: 5%;
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #deded3;
  margin: 0;
  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--brown);
  }
`;

const ImageContainer = styled.div`
  width: 35%;
  margin-right: 1.5rem;
  margin-left: 1rem;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 12rem;
  height: auto;
  display: block;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 55%;
  vertical-align: top;
  padding-right: 0.5rem;
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
`;

const DeleteBtn = styled.button`
  width: 5%;
  align-self: flex-start;
  cursor: pointer;
`;
