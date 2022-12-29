import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import MyAccount from '../../components/my-page/MyAccount';
import MyOrder from '../../components/my-page/MyOrder';
import { alternativeImg, getCookie, userInfoState } from '../../api/userInfo';
import { ACCOUNT_URL, HEADERS_USER } from '../../api/commonApi';
import style from './MyPage.module.css';
import { Link, Outlet } from 'react-router-dom';
import LoadingModal from '../../components/ui/loading/LoadingModal';

export default function MyPage() {
  const [loading, setLoading] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const [myAccount, setMyAccount] = useState({ totalBalance: 0, accounts: [] });
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    let json;
    const getAccount = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${ACCOUNT_URL}`, {
          method: 'GET',
          headers: { ...HEADERS_USER, Authorization: accessToken },
        });
        json = await res.json();
        const { totalBalance, accounts } = json;
        console.log(json);
        setMyAccount({ totalBalance, accounts });
      } catch {
        alert(json);
      }
      setLoading(false);
    };
    getAccount();
  }, [accessToken]);

  return (
    <main className={style.main}>
      {loading ? <LoadingModal /> : ''}
      <div className={style.flex}>
        <div className={style.left}>
          <div className={style.profile}>
            <img
              src={userInfo.profileImg ? userInfo.profileImg : alternativeImg}
              className={style.image}
              alt="profileImage"
            ></img>
            <span className={style.name}>{userInfo.displayName}님</span>
            <span className={style.email}>{userInfo.email}</span>
          </div>
          <p className={style.money}>
            <p>총 보유 금액</p>
            <span className={style.number}>{myAccount ? myAccount?.totalBalance?.toLocaleString() : 0}</span>
            <span>원</span>
          </p>
          <Link to="addaccount" className={style.button}>
            계좌 추가 연결하기
          </Link>
          <Outlet />
        </div>
        <ul className={style.right}>
          <MyAccount className={style.account} myAccount={myAccount} userInfo={userInfo} />
          <MyOrder className={style.order} accessToken={accessToken} />
        </ul>
      </div>
    </main>
  );
}
