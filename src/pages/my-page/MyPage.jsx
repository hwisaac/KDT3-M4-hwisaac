import React from 'react';
import { useRecoilValue } from 'recoil';
import MyAccount from '../../components/my-page/MyAccount';
import MyOrder from '../../components/my-page/MyOrder';
import { alternativeImg, getCookie, userInfoState } from '../../recoil/userInfo';
import style from './MyPage.module.css';
import { Link, Outlet } from 'react-router-dom';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { getAccountInfo } from '../../api/accountApi';
import { useQuery } from '@tanstack/react-query';

export const MyPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const accessToken = getCookie('accessToken');

  const { isLoading, data: myAccount, refetch } = useQuery(['myAccount'], () => getAccountInfo({ accessToken }));

  if (isLoading) return <LoadingModal />;
  return (
    <main className={style.main}>
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
            <span>총 보유 금액</span>
            <br />
            <span className={style.number}>{myAccount.totalBalance ? myAccount.totalBalance.toLocaleString() : 0}</span>
            <span>원</span>
          </p>
          <Link to="addaccount" className={style.button}>
            계좌 추가 연결하기
          </Link>
          <Outlet />
        </div>
        <ul className={style.right}>
          <MyAccount className={style.account} accessToken={accessToken} myAccount={myAccount} refetch={refetch} />
          <MyOrder className={style.order} accessToken={accessToken} />
        </ul>
      </div>
    </main>
  );
};
export default MyPage;
