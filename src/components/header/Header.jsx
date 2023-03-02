import { useRecoilState } from 'recoil';
import { authUrl, HEADERS_USER } from '../../api/commonApi';
import { loginState, userInfoState, alternativeImg, getCookie, deleteCookie } from '../../recoil/userInfo';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import { BsBag } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { adminUser } from '../../api/adminUser';
import RecentlyViewed from '../recently-viewed/RecentlyViewed';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  /* 검색 기능 */
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ search }) => {
    navigate(`/search?q=${search}`);
    setValue('search');
    setSearchOpen(false);
  };
  const onInvalid = () => {
    return alert('검색어를 입력해주세요');
  };
  const onSearchBtn = () => {
    setSearchOpen((prev) => !prev);
  };

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
          <Search onClick={onSearchBtn}>
            <CiSearch size={22} />
          </Search>
          <AnimatePresence>
            {searchOpen && (
              <SearchModal initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div initial={{ height: 0 }} animate={{ height: 200 }} exit={{ height: 0 }}>
                  <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <input
                      {...register('search', {
                        required: '검색어를 입력해주세요',
                      })}
                      type="search"
                      placeholder="SEARCH"
                    />
                    <button type="submit">
                      <CiSearch size={28} />
                    </button>
                  </form>
                </motion.div>
              </SearchModal>
            )}
          </AnimatePresence>

          <User>
            <li>ACCOUNT</li>
            <li>
              <BsBag /> (0)
            </li>
          </User>
        </Right>
      </Wrapper>
      {/* <div style={{ fontSize: '40px' }}>
        <span>Pangram</span>
        <span style={{ fontWeight: '200' }}>200</span>
        <span style={{ fontWeight: '300' }}>300</span>
        <span style={{ fontWeight: '400' }}>400</span>
        <span style={{ fontWeight: '500' }}>500</span>
        <span style={{ fontWeight: '600' }}>600</span>
        <span style={{ fontWeight: '700' }}>700</span>
        <span style={{ fontWeight: '800' }}>800</span>
        <span style={{ fontWeight: '900' }}>900</span>
      </div> */}
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
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.button`
  margin-right: 30px;
  display: flex;
  align-items: center;
  font-size: 25px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const SearchModal = styled(motion.div)`
  position: fixed;
  top: 101px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 10;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--color-white);
    form {
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      input {
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        background-color: transparent;
        border-bottom: 1px solid black;
        font-family: 'Fahkwang';
        font-weight: 600;
        font-size: 20px;
        ::placeholder {
          color: var(--color-gray2);
        }
      }
      button {
        position: absolute;
        right: 0;
        outline: none;
        border: none;
        background-color: var(--color-white);
        cursor: pointer;
      }
    }
  }
`;

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
