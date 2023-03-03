import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminUser } from '../../api/adminUser';
import { loginState, userInfoState } from '../../recoil/userInfo';
import styled from 'styled-components';
import EcoSection from 'components/home/EcoSection';
import Bestseller from 'components/home/Bestseller';
import Slider from 'components/kv/Slider';
import kvImg from 'assets/image/home/kv.jpg';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  useEffect(() => {
    isLoggedIn && adminUser(userInfo, setUserInfo);
  }, []);

  return (
    <HomePage>
      <Welcome>
        <span>your personal guide to</span>
        <h1 className="fah">ZERO WASTE</h1>
      </Welcome>
      <KeyVisual src={kvImg} />
      <DescriptionUs>
        <p className="fah">
          we help people like you make positive changes
          <br />
          for the <em>benefit</em> of our planet. we source and provide
          <br />
          the goods so you can be assured the choices you're
          <br />
          making are <em>sustainable</em> ones.
        </p>
        <span>ABOUT US</span>
      </DescriptionUs>
      <Bestseller />
      <EcoSection />
      <Slider />
    </HomePage>
  );
}

const HomePage = styled.main`
  padding-bottom: 100px;
`;
const Welcome = styled.section`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  h1 {
    font-weight: 200;
    font-size: 70px;
  }
`;
const KeyVisual = styled.img`
  background-color: gray;
  height: 600px;
  width: 100%;
  object-fit: cover;
`;

const DescriptionUs = styled.section`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  p {
    width: 50%;
    font-size: 18px;
    white-space: pre-line;
    text-align: center;
    em {
      color: var(--color-brown);
    }
  }
  span {
    font-size: 14px;
  }
`;
