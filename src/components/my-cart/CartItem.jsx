import React, { useEffect } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useCart from '../../util/useCart';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/productApi';
import styled from 'styled-components';
import formatPrice from 'util/formatPrice';

export default function CartItem({
  product,
  product: { productId, quantity, title, price, photo, isSoldOut },
  setGetSoldOutId,
  onChange,
  checked,
  setSelectedItems,
  updateSelectAllChecked,
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

  const handleDelete = () => {
    removeItem.mutate(productId);
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[productId];
      return updatedItems;
    });
    updateSelectAllChecked();
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
        <img src={photo} alt={title} />
      </ImageContainer>
      <Product>
        <Text>{title}</Text>
        <Text>{`${formatPrice(price * quantity)}원`}</Text>
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
  width: 1rem;
  height: 1rem;
  background-color: #deded3;
  margin: 0;
  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-brown);
  }
`;

const ImageContainer = styled.div`
  width: 30%;
  margin-right: 1.5rem;
  margin-left: 1rem;
  img {
    width: 100%;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 60%;
  vertical-align: top;
  padding-right: 0.5rem;
`;

const Text = styled.div`
  font-size: 0.8rem;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  font-size: 0.75rem;
`;

const DeleteBtn = styled.div`
  width: 5%;
  align-self: flex-start;
  cursor: pointer;
`;
