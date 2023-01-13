import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct } from '../../api/productApi';
import { getBuy, getAccountInfo } from '../../api/accountApi';
import { getCookie, userInfoState } from '../../recoil/userInfo';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import style from './MyBuy.module.css';
import BuyItem from '../../components/my-buy/BuyItem';
import Account from '../../components/my-buy/Account';
import useCart from '../../hooks/useCart';
import DeliveryForm from '../../components/my-buy/DeliveryForm';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from './../../components/ui/loading/LoadingModal';

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
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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
  } = useForm();

  // 결제 신청
  let deliveryId = '';

  const payload = {
    title: '배송비',
    price: 3000,
    description: '배송비 추가',
  };

  const onValid = async (data) => {
    /* 배송지정보에 있는 데이터를 보내고 싶으면 바로 위의 data 에서 가져다가 쓰면 됨 */
    if (AccountInfo.accounts.length === 0) {
      alert('연결된 계좌가 없어 결제가 불가능합니다. 계좌 연결을 먼저 해주세요.');
      navigate('/mypage');
      return;
    } else if (!accountId) {
      alert('계좌 선택을 먼저 해주세요.');
      return;
    }

    // 결제 로직
    Promise.all(
      products.map(async (product) => {
        let quantity = product.quantity || 1;
        while (quantity > 0) {
          await getBuy(product.productId || product.id, accountId, accessToken);
          quantity--;
        }
      }),
    )
      .then(() => {
        addProduct(payload).then(async (data) => {
          deliveryId = data.id;
          await getBuy(deliveryId, accountId, accessToken);
          await deleteProduct(deliveryId);
          alert(`${(productsPrice + 3000).toLocaleString()}원 결제가 완료되었습니다. 주문해주셔서 감사합니다.`);
          productIds.map(async (id) => (id ? removeItems.mutate(id) : navigate('/')));
        });
      })
      .catch(() => {
        alert('일시적인 오류로 인해 결제가 불가능합니다. 문의 남겨주시면 빠르게 처리 도와드리겠습니다.');
        navigate('/');
      });
  };

  const onInvalid = () => {
    setErrorStyle(true);
    alert('배송지정보를 올바르게 입력해주세요');
  };

  return (
    <div className={style.body}>
      <div className={style.wrap}>
        <h1>주문/결제</h1>
        <div className={style.infos}>
          <table>
            <caption>주문내역</caption>
            <colgroup>
              <col width="450" />
              <col width="120" />
              <col width="100" />
              <col width="120" />
            </colgroup>
            <thead className={style.infoHead}>
              <tr>
                <th scope="col">정보</th>
                <th scope="col">판매자</th>
                <th scope="col">수량</th>
                <th scope="col">금액</th>
              </tr>
            </thead>
            <tbody className={style.infoBody}>
              {/* 장바구니 상품 구매 */}
              {products
                ? products.map((product) => (
                    <BuyItem
                      key={product.productId || product.id}
                      id={product.productId || product.id}
                      photo={product.photo}
                      title={product.title}
                      quantity={product.quantity || 1}
                      price={product.price}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <div className={style.infosBottom}>
          {/* 배송지정보, 주문자정보 */}
          <div className={style.forms}>
            {/* 배송지정보 */}
            <DeliveryForm register={register} fromError={fromError} errorStyle={errorStyle} setValue={setValue} />
            {/* 주문자정보 */}
            <div className={style.ordererInfo}>
              <h2>주문자 정보</h2>
              <p>
                <span>성함</span> {userInfo.displayName}
              </p>
              <p>
                <span>이메일</span> {userInfo.email}
              </p>
            </div>
          </div>

          {/* 결제수단, 결제상세 */}
          <div className={style.pay}>
            {/* 결제수단 */}
            <div className={style.paySelect}>
              <h2>결제수단</h2>

              <div className={style.accountInfos}>
                <ul>
                  {isLoading ? (
                    <LoadingModal />
                  ) : AccountInfo.accounts?.length === 0 ? null : (
                    AccountInfo.accounts?.map((account) => (
                      <Account
                        key={account.id}
                        id={account.id}
                        bankName={account.bankName}
                        balance={account.balance}
                        accountNumber={account.accountNumber}
                        productsPrice={productsPrice}
                        onChange={onChange}
                      />
                    ))
                  )}
                  {/* 계좌 연결 X */}
                  <li className={style.accountInfoNone}>
                    <Link
                      to={'/mypage'}
                      onClick={() => {
                        alert('계좌 추가 페이지로 이동합니다');
                      }}
                    >
                      <div>
                        <span>icon</span>
                        <p>계좌 추가</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 결제상세 */}
            <div className={style.payDetail}>
              <h2>결제상세</h2>
              <p>
                <strong>주문금액</strong> <span>{productsPrice.toLocaleString()}원</span>
              </p>
              <p>
                <strong>배송비</strong> <span>3,000원</span>
              </p>
              <p>
                <strong>총 결제 금액</strong> <span>{(productsPrice + 3000).toLocaleString()}원</span>
              </p>
            </div>
          </div>
        </div>

        {/* 결제하기 */}
        <div className={style.payBtn}>
          <button type="submit" onClick={handleSubmit(onValid, onInvalid)}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBuy;
