import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ACCOUNT_URL, HEADERS_USER, API_URL, HEADERS } from '../data/API';
import { userInfoState, getCookie } from '../data/LoginData';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import style from './MyBuy.module.css';

const MyBuy = () => {
  const { state: buyProduct } = useLocation();
  // buyProduct가 여러개일 경우 products로 할당함, 아닐 경우 product에 할당
  const products = buyProduct && buyProduct.length > 0 && buyProduct;
  const product = buyProduct && buyProduct.length === undefined && buyProduct;

  const accessToken = getCookie('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [accountId, setAccountId] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 계좌 조회 api
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

  // 계좌 버튼 클릭 시 계좌 id 넣어주기
  const onClick = (id) => {
    setAccountId(id);
    console.log('결제할 은행 : ', id);
  };

  // 결제 함수
  const getBuy = async (productId, accountId) => {
    try {
      const res = await fetch(API_URL + 'products/buy', {
        method: 'POST',
        headers: { ...HEADERS, Authorization: accessToken },
        body: JSON.stringify({
          productId,
          accountId,
        }),
      });
      console.log(res);

      if (res.status === 200) {
        return res;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // 결제하기 클릭 시 결제 신청
  const onClickBuy = async () => {
    if (products) {
      for (let product of products) {
        let quantity = product.quantity;
        while (quantity > 0) {
          await getBuy(product.productId, accountId);
          console.log(product.title, quantity);
          quantity--;
        }
      }
      alert('결제가 완료되었습니다.');
    } else {
      await getBuy(product.id, accountId);
      alert('결제가 완료되었습니다.');
    }
  };

  // 객체로 저장해서
  const [value, setValue] = useState('');
  const onChange = (event) => {
    console.log(event.target.value);
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
              {product ? (
                <tr className={style.productInfos}>
                  <td>
                    <div className={style.productInfo}>
                      {/* <Link> */}
                      <img src={product.photo} alt={product.title} />
                      {/* </Link> */}
                      <div className={style.productTitle}>
                        <p>[스마트스토어] 프레시멘토</p>
                        <strong>{product.title}</strong>
                      </div>
                    </div>
                  </td>

                  <td>프레시멘토</td>
                  <td>1개</td>
                  <td>{product.price?.toLocaleString()}원</td>
                </tr>
              ) : null}
              {products
                ? products.map((product) => (
                    <tr key={product.productId} className={style.productInfos}>
                      <td>
                        <div className={style.productInfo}>
                          {/* <Link> */}
                          <img src={product.photo} alt={product.title} />
                          {/* </Link> */}
                          <div className={style.productTitle}>
                            <p>[스마트스토어] 프레시멘토</p>
                            <strong>{product.title}</strong>
                          </div>
                        </div>
                      </td>

                      <td>프레시멘토</td>
                      <td>{product.quantity}개</td>
                      <td>{product.price?.toLocaleString()}원</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <div className={style.infosBottom}>
          {/* 배송지정보, 주문자정보 */}
          <div style={{ display: 'flex' }} className={style.infoss}>
            {/* 배송지정보 */}
            <div className={style.deliveryInfo}>
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
            <div className={style.ordererInfo}>
              <h2>주문자 정보</h2>
              <p>{userInfo.displayName}</p>
            </div>
          </div>

          {/* 결제수단, 결제상세 */}
          <div className={style.pay}>
            {/* 결제수단 */}
            <div className={style.paySelect}>
              <h2>결제수단</h2>

              {/* 계좌 목록 및 잔액 조회 map */}
              {/* 없으면 메인페이지의 계좌 연결 페이지로 이동 */}
              {/* 계좌연결 버튼은 마지막 */}
              {/* 계좌선택하면 계좌 id 를 받아서 결제하기 버튼을 누르는 순간 상품 id 랑 같이 결제 api 에 전달해서 결제가 되도록 */}
              <div className={style.accountInfos}>
                <ul>
                  {accountData.map((account) => (
                    <li key={account.id} className={style.accountInfo}>
                      <button
                        onClick={() => onClick(account.id, account.bankName)}
                        style={{ backgroundColor: 'salmon' }}
                      >
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
            <div className={style.payDetail}>
              <h2>결제상세</h2>
              <p>
                {/* 최종 금액: 장바구니에서 가져온 모든 상품들 합한 금액 */}
                <strong>주문금액</strong> <span>{product.price?.toLocaleString()}원</span>
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
