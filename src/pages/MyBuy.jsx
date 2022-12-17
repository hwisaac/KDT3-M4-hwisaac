import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ACCOUNT_URL, HEADERS_USER, API_URL, HEADERS } from '../data/API';
import { userInfoState, alternativeImg, getCookie, deleteCookie } from '../data/LoginData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';

const MyBuy = () => {
  const { state: buyProduct } = useLocation();
  // buyProduct가 여러개일 경우 products로 할당함, 아닐 경우 product에 할당
  const products = buyProduct && buyProduct.length > 0 && buyProduct;
  const product = buyProduct && buyProduct.length === undefined && buyProduct;
  console.log('products:', products);
  console.log('product:', product);

  const accessToken = getCookie('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [accountId, setAccountId] = useState('');

  const getAccountInfo = async () => {
    try {
      const res = await fetch(ACCOUNT_URL, {
        method: 'GET',
        headers: { ...HEADERS_USER, Authorization: accessToken },
      });
      const { totalBalance, accounts } = await res.json();
      console.log(accounts);

      if (accounts) {
        setAccountData(accounts);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAccountInfo();
  }, []);

  function onClick(id, name) {
    setAccountId(id);
    console.log('결제할 은행 : ', name);
  }

  // 결제 함수
  const getBuy = async () => {
    try {
      const res = await fetch(API_URL + 'products/buy', {
        method: 'POST',
        headers: { ...HEADERS, Authorization: accessToken },
        body: JSON.stringify({
          productId: product.productId,
          accountId: accountId,
        }),
      });
      if (res.status === 200) {
        alert('결제가 완료되었습니다.');
        return res;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onClickBuy = async () => {
    getBuy();
  };

  // 객체로 저장해서
  const [value, setValue] = useState('');
  const onChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>주문/결제</h1>
      {/* 결제할 상품 정보 */}
      <ul>
        {/* thead */}
        <li>
          <p>정보</p>
          <p>판매자</p>
          <p>수량</p>
          <p>금액</p>
        </li>
        <li>
          <div>
            <img style={{ width: 150 }} src={product.photo} alt={product.title} />
            <div>
              <p>[스마트스토어] 프레시멘토</p>
              <p>{product.title}</p>
            </div>
          </div>
          <p>프레시멘토</p>
          <p>1개(quantity)</p>
          <p>{product.price?.toLocaleString()}원</p>
        </li>
      </ul>
      <div style={{ display: 'flex' }}></div>

      {/* 배송지정보, 주문자정보 */}
      <div style={{ display: 'flex' }}>
        {/* 배송지정보 */}
        <div>
          <h2>배송지정보</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <p>
              <span>수령인</span> <input value={value} onChange={onChange} type="text" />
            </p>
            <p>
              <span>연락처</span> <input value={value} onChange={onChange} type="text" />
            </p>
            <p>
              <span>배송지 주소</span> <input value={value} onChange={onChange} type="text" />
            </p>
            <p>
              <span>배송메모</span> <input value={value} onChange={onChange} type="text" />
            </p>
          </form>
        </div>
        {/* 주문자정보 */}
        <div>
          <h2>주문자 정보</h2>
          <p>user name</p>
        </div>
      </div>

      {/* 결제수단, 결제상세 */}
      <div>
        {/* 결제수단 */}
        <div>
          <h2>결제수단</h2>

          {/* 계좌 목록 및 잔액 조회 map */}
          {/* 없으면 메인페이지의 계좌 연결 페이지로 이동 */}
          {/* 계좌연결 버튼은 마지막 */}
          {/* 계좌선택하면 계좌 id 를 받아서 결제하기 버튼을 누르는 순간 상품 id 랑 같이 결제 api 에 전달해서 결제가 되도록 */}
          <div>
            <ul>
              {accountData.map((account) => (
                <li key={account.id}>
                  <button onClick={() => onClick(account.id, account.bankName)} style={{ backgroundColor: 'salmon' }}>
                    <div>
                      <p>{account.bankName}</p>
                      <p>계좌번호</p>
                      <p>{account.accountNumber}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 결제상세 */}
        <div>
          <h2>결제상세</h2>
          <p>
            {/* 최종 금액: 장바구니에서 가져온 모든 상품들 합한 금액 */}
            <span>주문금액</span> <span>{product.price?.toLocaleString()}원</span>
          </p>
        </div>
      </div>

      {/* 결제하기 */}
      <div>
        <button onClick={() => onClickBuy()}>결제하기</button>
      </div>
    </div>
  );
};

export default MyBuy;
