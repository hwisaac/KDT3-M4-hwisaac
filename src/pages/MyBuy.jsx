import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ACCOUNT_URL, HEADERS_USER, API_URL, HEADERS, addProduct, deleteProduct } from '../data/API';
import { userInfoState, getCookie } from '../data/LoginData';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import style from './MyBuy.module.css';

const MyBuy = () => {
  const { state: buyProduct } = useLocation();
  // buyProduct가 여러개일 경우 products로 할당함, 아닐 경우 product에 할당
  const products = buyProduct && buyProduct.length > 0 && buyProduct;
  const product = buyProduct && buyProduct.length === undefined && buyProduct;

  console.log(products);
  let deliveryId = '';
  let productsPrice = 0;
  if (products) {
    for (let product of products) {
      let quantity = product.quantity;
      while (quantity > 0) {
        productsPrice += product.price;
        quantity--;
      }
    }
  } else {
    productsPrice = product.price;
  }

  const accessToken = getCookie('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [accountId, setAccountId] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const accountColor = {
    KB국민은행: '#776C61',
    신한은행: '#2B40AB',
    우리은행: '#0199CA',
    하나은행: '#009693',
    케이뱅크: '#343E48',
    카카오뱅크: '#FDE100',
    NH농협은행: '#08B353',
  };

  // 계좌 조회 api
  const getAccountInfo = async () => {
    try {
      const res = await fetch(ACCOUNT_URL, {
        method: 'GET',
        headers: { ...HEADERS_USER, Authorization: accessToken },
      });
      const { accounts } = await res.json();

      return accounts;
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAccountInfo().then((data) => {
      setAccountData(data);
    });
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
      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  // 결제하기 클릭 시 결제 신청
  const onClickBuy = async () => {
    if (accountData.length === 0) {
      alert('연결된 계좌가 없어 결제가 불가능합니다. 계좌 연결을 먼저 해주세요.');
      window.location = '/mypage';
    }
    if (!accountId) {
      alert('계좌 선택을 먼저 해주세요.');
      window.location.reload();
    }
    if (products) {
      for (let product of products) {
        let quantity = product.quantity;
        while (quantity > 0) {
          const response = await getBuy(product.productId, accountId);
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
        await getBuy(deliveryId, accountId);
        await deleteProduct(deliveryId);
        alert(`${(productsPrice + data.price).toLocaleString()}원 결제가 완료되었습니다. 주문해주셔서 감사합니다.`);
        window.location = '/';
      });
    } else {
      await getBuy(product.id, accountId);

      // 배송비 결제
      const payload = {
        title: '배송비',
        price: 3000,
        description: '배송비 추가',
      };
      addProduct(payload).then(async (data) => {
        deliveryId = data.id;
        await getBuy(deliveryId, accountId);
        await deleteProduct(deliveryId);
        alert(`${(productsPrice + data.price).toLocaleString()}원 결제가 완료되었습니다. 주문해주셔서 감사합니다.`);
        window.location = '/';
      });
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
                <tr>
                  <td>
                    <div className={style.productInfo}>
                      <Link to={`/products/${product.productId}`} state={product}>
                        <img src={product.photo} alt={product.title} />
                      </Link>
                      <div className={style.productTitle}>
                        <p>[스마트스토어] 프레시멘토</p>
                        <Link to={`/products/${product.productId}`} state={product}>
                          <strong>{product.title}</strong>
                        </Link>
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
                    <tr key={product.productId}>
                      <td>
                        <div className={style.productInfo}>
                          <Link to={`/products/${product.productId}`} state={{ id: product.productId }}>
                            <img src={product.photo} alt={product.title} />
                          </Link>
                          <div className={style.productTitle}>
                            <p>[스마트스토어] 프레시멘토</p>
                            <Link to={`/products/${product.productId}`} state={{ id: product.productId }}>
                              <strong>{product.title}</strong>
                            </Link>
                          </div>
                        </div>
                      </td>

                      <td>프레시멘토</td>
                      <td>{product.quantity}개</td>
                      <td>{(product.price * product.quantity).toLocaleString()}원</td>
                    </tr>
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
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="50자 이내로 입력하세요"
                    maxLength={50}
                  />
                </p>
                <p>
                  <span>연락처</span>
                  <input value={value} onChange={onChange} type="text" placeholder="- 기호는 제외하고 입력해주세요" />
                </p>
                <p>
                  <span>배송지 주소</span>
                  <input value={value} onChange={onChange} type="text" />
                </p>
                <p>
                  <span>배송메모</span>
                  <input
                    value={value}
                    onChange={onChange}
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
                  {accountData.length === 0
                    ? null
                    : accountData.map((account) => (
                        <li key={account.id} className={style.accountInfo}>
                          <label>
                            <div
                              className={style.account}
                              style={{ backgroundColor: `${accountColor[account.bankName]}` }}
                            >
                              <input
                                type="radio"
                                name="account"
                                onChange={() => {
                                  if (account.balance >= productsPrice + 3000) {
                                    onClick(account.id, account.bankName);
                                  } else {
                                    return alert('해당 계좌에 잔액이 부족하여 결제가 불가능합니다.');
                                  }
                                }}
                              />
                              <div className={style.accountTxt}>
                                <p>{account.bankName}</p>
                                <p>계좌번호</p>
                                <p>{account.accountNumber}</p>
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
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
