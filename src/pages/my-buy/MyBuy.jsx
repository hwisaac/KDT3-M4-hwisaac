import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBuy, getAccountInfo } from '../../api/accountApi';
import { userInfoState } from '../../recoil/userInfo';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import BuyItem from '../../components/my-buy/BuyItem';
import useCart from '../../util/useCart';
import { getCookie } from './../../recoil/userInfo';
import ShippingForm from '../../components/my-buy/ShippingForm';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingModal from './../../components/ui/loading/LoadingModal';
import styled from 'styled-components';
import PaymentForm from './../../components/my-buy/PaymentForm';
import formatPrice from '../../util/formatPrice';

const MyBuy = () => {
  /* 장바구니와 상세페이지에서 전달받은 제품 정보 */
  const { state: buyProduct } = useLocation();
  const { removeItems } = useCart();
  const navigate = useNavigate();
  const products = buyProduct && buyProduct.length > 0 && buyProduct;
  const productIds = products && products.map((product) => product.productId);

  // 모든 제품의 총 가격
  let productsPrice = 0;
  if (products) {
    for (let product of products) {
      if (product.quantity) {
        productsPrice += product.price * product.quantity;
      } else {
        productsPrice += product.price;
      }
    }
  }

  /* 유저 정보 */
  const [userInfo] = useRecoilState(userInfoState);
  const accessToken = getCookie('accessToken');

  /* 계좌 조회 */
  const { isLoading, data: AccountInfo } = useQuery(['account'], () => {
    return getAccountInfo({ accessToken });
  });

  /* 계좌 버튼 클릭 시 계좌 id 넣어주기 */
  const [accountId, setAccountId] = useState('');

  const onChange = (id) => {
    setAccountId(id);
  };

  /* 결제하기 클릭 시 결제 신청 */
  // 배송지정보 form
  const [errorStyle, setErrorStyle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: fromError },
    setValue,
    setFocus,
  } = useForm();

  const errorMessage = '일시적인 오류로 인해 결제가 불가능합니다. 문의 남겨주시면 빠르게 처리 도와드리겠습니다.';

  // 결제 api, 상품 정보 수정 api
  const productBuy = useMutation(([productId, accountId, accessToken]) => getBuy(productId, accountId, accessToken), {
    onError: () => {
      return alert(errorMessage);
    },
  });

  // 배송지 정보 O && 결제 로직 실행
  const onValid = async (data) => {
    console.log(data); // 입력한 배송지 정보

    if (AccountInfo.accounts.length === 0) {
      alert('연결된 계좌가 없어 결제가 불가능합니다. 계좌 연결을 먼저 해주세요.');
      navigate('/mypage');
      return;
    } else if (!accountId) {
      alert('계좌 선택을 먼저 해주세요.');
      return;
    }

    try {
      for (let i = 0; i < products.length; i++) {
        let quantity = products[i].quantity || 1;
        while (quantity > 0) {
          await productBuy.mutateAsync([products[i].productId || products[i].id, accountId, accessToken]);
          quantity--;
        }
      }
      alert(`${formatPrice(productsPrice)} 결제가 완료되었습니다. 주문해주셔서 감사합니다.`);
      productIds.map(async (id) => (id ? removeItems.mutate(id) : navigate('/')));
    } catch (error) {
      alert(errorMessage);
    } finally {
      console.log('끝!!!!!!');
    }
  };

  // 배송지 정보 X
  const onInValid = () => {
    setErrorStyle(true);
    alert('배송지정보를 올바르게 입력해주세요');
  };

  return (
    <>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <Wrapper>
          <Infos>
            <Details>
              <h1>DETAILS</h1>
              <p>
                <span>NAME</span> {userInfo.displayName}
              </p>
              <p>
                <span>E-MAIL</span> {userInfo.email}
              </p>
            </Details>
            <Adress>
              <h1>SHIPPING ADRESS</h1>
              <ShippingForm
                register={register}
                fromError={fromError}
                errorStyle={errorStyle}
                setValue={setValue}
                setFocus={setFocus}
              />
            </Adress>
            <Payment>
              <h1>PAYMENT</h1>
              <PaymentForm infos={AccountInfo} productsPrice={productsPrice} onChange={onChange} />
            </Payment>
          </Infos>

          <Orders>
            <h1>YOUR ORDER</h1>
            <ProductWrap>
              {products &&
                products.map((product) => (
                  <BuyItem
                    key={product.productId || product.id}
                    id={product.productId || product.id}
                    photo={product.photo}
                    title={product.title}
                    quantity={product.quantity || 1}
                    price={product.price}
                  />
                ))}
            </ProductWrap>
            <TotalPrice>
              <span>TOTAL</span>
              <span>{formatPrice(productsPrice)}</span>
            </TotalPrice>

            <ButtonArea>
              <ErrorMassage>{fromError?.checkbox?.message}</ErrorMassage>
              <label>
                <input
                  type="checkbox"
                  {...register('checkbox', { required: 'You must check to be able to purchase.' })}
                />
                <span>I have read and agree to the terms and conditions</span>
              </label>
              <button onClick={handleSubmit(onValid, onInValid)}>place order</button>
            </ButtonArea>
          </Orders>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 1200px;
  margin: 60px auto;
  font-family: 'Pangram';
  display: flex;

  h1 {
    margin-bottom: 30px;
    font-family: 'Fahkwang';
    font-size: 35px;
  }
`;
const Infos = styled.div`
  width: 60%;
`;
const Details = styled.div`
  margin-bottom: 60px;
  p {
  }
  span {
    display: inline-block;
    width: 100px;
    font-family: 'Fahkwang';
    line-height: 30px;
  }
`;
const Adress = styled.div`
  margin-bottom: 60px;
`;
const Payment = styled.div``;
const Orders = styled.div`
  width: 40%;
  height: fit-content;
  padding: 30px;
  border: 1px solid var(--color-light-grey);
`;
const ProductWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    border-bottom: 1px solid var(--color-light-grey1);
    :nth-child(1) {
      border-top: 1px solid var(--color-light-grey1);
    }
  }
`;
const TotalPrice = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
  span {
    :nth-child(1) {
      margin-right: 20px;
    }
  }
`;
const ButtonArea = styled.div`
  margin-top: 60px;
  input {
    appearance: none;
    ::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid var(--color-light-grey1);
      margin-right: 5px;
    }
    :checked::after {
      background-color: black;
    }
  }
  span {
    font-size: 15px;
    color: var(--color-light-grey1);
  }
  button {
    width: 100%;
    padding: 20px 0;
    margin-top: 15px;
    border: none;
    outline: none;
    background-color: #303631;
    color: var(--color-white);
    font-size: 20px;
    font-family: 'Fahkwang';
  }
`;

const ErrorMassage = styled.p``;

export default MyBuy;
