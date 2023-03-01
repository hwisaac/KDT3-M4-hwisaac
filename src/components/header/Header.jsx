import { useRecoilState } from 'recoil';
import { authUrl, HEADERS_USER } from '../../api/commonApi';
import { loginState, userInfoState, alternativeImg, getCookie, deleteCookie } from '../../recoil/userInfo';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import { BsBag } from 'react-icons/bs';
import { adminUser } from '../../api/adminUser';
import RecentlyViewed from '../recently-viewed/RecentlyViewed';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

export default function Header() {
  /* 검색 기능 */
  const navigate = useNavigate();

  return (
    <HeaderComponent>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo className="fah">NOWASTE</Logo>
          </Link>
          <Menues>
            <NavLink to="category/농산물" activeClass="active">
              <li>SHOP</li>
            </NavLink>
            <NavLink to="category/수산물" activeClass="active">
              <li>ABOUT</li>
            </NavLink>
            <li>BLOG</li>
            <li>CONTACT US</li>
          </Menues>
        </Left>
        <Right>
          <User>
            <li>ACCOUNT</li>
            <li>
              <BsBag /> (0)
            </li>
          </User>
        </Right>
      </Wrapper>
    </HeaderComponent>
  );
}
const HeaderComponent = styled.div`
  background-color: var(--color-white);
`;
const Wrapper = styled.div`
  border-bottom: 1px solid black;
  padding: auto 0;
  width: 1200px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  height: 100%;
`;
const Menues = styled.ul`
  display: flex;
  gap: 40px;
  height: 100%;
  .active {
    font-weight: 500;
    li {
      box-shadow: inset 0 -1.5px 0 var(--color-black2);
    }
  }
  li {
    display: flex;
    align-items: center;
    height: 100%;
    box-shadow: inset 0 -1.5px 0 rgba(0, 0, 0, 0);
  }
`;
const Right = styled.div``;

const Logo = styled.div`
  font-size: 25px;
  margin-right: 40px;
`;
const User = styled.ul`
  display: flex;
  gap: 30px;
  align-items: center;
  li {
    display: flex;
    align-items: center;
  }
`;
