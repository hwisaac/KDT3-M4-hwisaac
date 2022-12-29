import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { adminUser } from '../../api/adminUser';
import Slider from '../../components/kv/Slider';
import TotalProduct from '../../components/total-product/TotalProduct';
import { loginState, userInfoState } from '../../api/userInfo';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  useEffect(() => {
    isLoggedIn && adminUser(userInfo, setUserInfo);
  }, []);

  return (
    <main>
      <Slider />
      <TotalProduct />
    </main>
  );
}
