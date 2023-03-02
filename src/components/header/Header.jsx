import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import styled from 'styled-components';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export default function Header() {
  /* 검색 기능 */
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  return (
    <>
      <HeaderComponent>
        <Wrapper>
          <Left>
            <Link to="/">
              <Logo className="fah">NOWASTE</Logo>
            </Link>
            <Menues>
              <NavLink to="category/농산물">
                <li>ZERO WASTE KITS</li>
              </NavLink>
              <NavLink to="category/수산물">
                <li>HOUSEHOLD</li>
              </NavLink>
              <li>BATH AND BODY</li>
            </Menues>
          </Left>
          <Right>
            <User>
              <Link to="/mypage">
                <li>ACCOUNT</li>
              </Link>

              <li>
                <BsBag /> (0)
              </li>
            </User>
          </Right>
        </Wrapper>
      </HeaderComponent>
    </>
  );
}
const Dummy = styled.div`
  height: 100px;
`;
const HeaderComponent = styled.div`
  z-index: 1000;
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  height: 80px;
`;
const Wrapper = styled.div`
  border-bottom: 1px solid black;
  padding: auto 0;
  width: 1200px;
  height: 100%;
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
  font-size: 27px;
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
