import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ACCOUNT_URL, HEADERS_USER } from '../data/API';
import { alternativeImg, getCookie, loginState, userInfoState } from '../data/LoginData';
import style from './MyPage.module.css';
// import './';

export default function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [myAccount, setMyAccount] = useState({ totalBalance: 0, accounts: [] });

  useEffect(() => {
    let json;
    const getAccount = async () => {
      try {
        const accessToken = getCookie('accessToken');
        const res = await fetch(`${ACCOUNT_URL}`, {
          method: 'GET',
          headers: { ...HEADERS_USER, Authorization: accessToken },
        });
        json = await res.json();
        const { totalBalance, accounts } = json;
        setMyAccount({ totalBalance, accounts });
      } catch {
        alert(json);
      }
    };
    getAccount();
  }, []);

  return (
    <main className={style.main}>
      <h2 className={style.h2}>마이페이지</h2>
      <div className={style.left}>
        <div className={style.profile}>
          <img src={userInfo.profileImg ? userInfo.profileImg : alternativeImg} className={style.image}></img>
          <span className={style.name}>{userInfo.displayName}님</span>
          <span className={style.email}>{userInfo.email}</span>
        </div>
        <p className={style.money}>
          <p>총 보유 금액</p>
          <span className={style.number}>{myAccount ? myAccount?.totalBalance?.toLocaleString() : 0}</span>
          <span>원</span>
        </p>
        <button className={style.button}>계좌 추가 연결하기</button>
      </div>

      <ul className={style.right}>
        <p className={style.p}> {userInfo.displayName}님의 연결된 계좌</p>
        {myAccount.accounts ? (
          myAccount.accounts.map((account, index) => (
            <ul key={account.id} className={style.account}>
              {index + 1}
              <li>{account.bankName}</li>
              <li>{account.accountNumber}</li>
              <li>{account.balance}</li>
            </ul>
          ))
        ) : (
          <p>연결된 계좌가 없습니다. 계좌를 연결해 주세요.</p>
        )}
      </ul>
      <form></form>
    </main>
  );
}
