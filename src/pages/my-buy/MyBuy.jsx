import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct } from '../../api/productApi';
import { getBuy, getAccountInfo } from '../../api/accountApi';
import { userInfoState } from '../../recoil/userInfo';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import style from './MyBuy.module.css';
import BuyItem from '../../components/my-buy/BuyItem';
import Account from '../../components/my-buy/Account';
import useCart from '../../hooks/useCart';
import { getCookie } from './../../recoil/userInfo';

const MyBuy = () => {
  const [loading, setLoading] = useState(true);

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

  /* 계좌 조회 */
  const [accountData, setAccountData] = useState([]);
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    const account = getAccountInfo({ accessToken });
    account.then((data) => {
      setAccountData(data);
      setLoading(false);
    });
  }, []);

  // 계좌 버튼 클릭 시 계좌 id 넣어주기
  const onChange = (id) => {
    setAccountId(id);
  };

  /* 결제하기 클릭 시 결제 신청 */
  // 배송비 id 초기화
  let deliveryId = '';

  const onClickBuy = async () => {
    if (value === '') {
      alert('배송지 정보가 비어있으니 입력 후 결제 바랍니다.');
      return;
    } else if (accountData.length === 0) {
      alert('연결된 계좌가 없어 결제가 불가능합니다. 계좌 연결을 먼저 해주세요.');
      navigate('/mypage');
      return;
    } else if (!accountId) {
      alert('계좌 선택을 먼저 해주세요.');
      return;
    }

    const accessToken = getCookie('accessToken');

    // 결제 로직
    if (products) {
      for (let product of products) {
        // 단일 상품 구매 시 개수 정보가 없기 때문에 1 로 설정
        let quantity = product.quantity || 1;
        while (quantity > 0) {
          const response = await getBuy(product.productId || product.id, accountId, accessToken);
          if (response.status !== 200) {
            return (
              alert('일시적인 오류로 인해 결제가 불가능합니다. 문의 남겨주시면 빠르게 처리 도와드리겠습니다.'),
              window.location.reload()
            );
          }
          quantity--;
        }
      }

      // 배송비 결제
      const payload = {
        title: '배송비',
        price: 3000,
        description: '배송비 추가',
      };
      addProduct(payload).then(async (data) => {
        deliveryId = data.id;
        await getBuy(deliveryId, accountId, accessToken);
        await deleteProduct(deliveryId);
        alert(`${(productsPrice + data.price).toLocaleString()}원 결제가 완료되었습니다. 주문해주셔서 감사합니다.`);
        productIds.map(async (id) => (id ? removeItems.mutate(id) : navigate('/')));
      });
    }
  };

  // 배송지정보 form
  const [value, setValue] = useState('');
  const onChangeInput = (event) => {
    setValue(event.target.value);
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
            <div className={style.deliveryInfo}>
              <h2>배송지정보</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <p>
                  <span>수령인</span>
                  <input
                    onChange={onChangeInput}
                    type="text"
                    placeholder="50자 이내로 입력하세요"
                    maxLength={50}
                    required
                  />
                </p>
                <p>
                  <span>연락처</span>
                  <input onChange={onChangeInput} type="text" placeholder="- 기호는 제외하고 입력해주세요" required />
                </p>
                <p>
                  <span>배송지 주소</span>
                  <input onChange={onChangeInput} type="text" required />
                </p>
                <p>
                  <span>배송메모</span>
                  <input
                    onChange={onChangeInput}
                    type="text"
                    placeholder="30자 이내로 요청 사항을 입력해주세요"
                    maxLength={30}
                  />
                </p>
              </form>
            </div>
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
                  {loading
                    ? null
                    : accountData?.length === 0
                    ? null
                    : accountData?.map((account) => (
                        <Account
                          key={account.id}
                          id={account.id}
                          bankName={account.bankName}
                          balance={account.balance}
                          accountNumber={account.accountNumber}
                          productsPrice={productsPrice}
                          onChange={onChange}
                        />
                      ))}
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
          <button onClick={onClickBuy}>결제하기</button>
        </div>
      </div>
    </div>
  );
};

export default MyBuy;
