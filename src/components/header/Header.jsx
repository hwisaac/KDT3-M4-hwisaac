import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { adminUser } from '../../api/adminUser';
import RecentlyViewed from '../recently-viewed/RecentlyViewed';
import { useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import useInputFocus from 'util/useInputFocus';
import { useRecoilValue } from 'recoil';
import { loginState } from 'recoil/userInfo';
import useCart from 'util/useCart';

export default function Header() {
  const { scrollY } = useScroll();
  const isLoggedIn = useRecoilValue(loginState);
  /* 검색 기능 */
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  // const [isFocused, setIsFocused] = useState(false);

  const inputAnimation = useAnimation();
  console.log(isLoggedIn);
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    const inputField = document.getElementById('search');

    if (searchOpen) inputField.focus();
  }, [searchOpen]);

  const onValid = ({ search }) => {
    console.log('data', search);
    navigate(`/search?q=${search}`);
    // setValue(search);
    // setSearchOpen(false);
  };
  const onInvalid = (data) => {
    console.log('invalid data', data);
    return alert('검색어를 입력해주세요');
  };
  const onSearchBtn = () => {
    setSearchOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   if (searchOpen) document.body.style = 'overflow: hidden';
  //   else document.body.style = 'overflow: auto';
  // }, [searchOpen]);

  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  const countCartItems = products && products.length;

  return (
    <>
      <HeaderComponent>
        <Wrapper>
          <Left>
            <Link to="/">
              <Logo className="fah">NOWASTE</Logo>
            </Link>
            <Menues>
              <NavLink to="category/kitchen">
                <li>KITCHEN</li>
              </NavLink>
              <NavLink to="category/cleaning">
                <li>CLEANING</li>
              </NavLink>
              <NavLink to="category/body">
                <li>BODY CARE</li>
              </NavLink>
              <NavLink to="category/shaving">
                <li>SHAVING AND BEARD</li>
              </NavLink>
            </Menues>
          </Left>
          <Right>
            <Search onSubmit={handleSubmit(onValid, onInvalid)} searchOpen={searchOpen}>
              <motion.div onClick={toggleSearch} animate={{ x: searchOpen ? 20 : 170 }}>
                <AiOutlineSearch size={22} />
              </motion.div>
              <Input
                {...register('search', { required: true, minLength: 2 })}
                animate={inputAnimation}
                initial={{ scaleX: 0 }}
                id="search"
                placeholder="Search"
              />
            </Search>
            <User>
              {isLoggedIn ? (
                <>
                  <Link to="/mypage/myaccount">
                    <li>ACCOUNT</li>
                  </Link>
                  <Link to="/mycart">
                    <li>
                      <BsBag />
                      <span>({countCartItems})</span>
                    </li>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <li>LOGIN</li>
                </Link>
              )}
            </User>
          </Right>
        </Wrapper>
      </HeaderComponent>
    </>
  );
}
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

  li {
    display: flex;
    align-items: center;
    height: 100%;
    opacity: 0.5;
    box-shadow: inset 0 -1.5px 0 rgba(0, 0, 0, 0);
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    li {
      opacity: 1;
      box-shadow: inset 0 -1.5px 0 var(--color-black2);
    }
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  gap: 30px;
`;
const Search = styled.form`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  height: 30px;
  width: 180px;
  div {
    width: auto;
    height: auto;
    position: relative;
    /* border: 1px solid blue; */
    top: 4px;
  }
  svg {
    opacity: ${(props) => (props.searchOpen ? 0.5 : 1)};
    cursor: pointer;
  }
  input {
  }
`;

const SearchModal = styled(motion.div)`
  position: fixed;
  top: 81px;
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
const Input = styled(motion.input)`
  transform-origin: right center;
  width: 100%;
  height: 100%;
  padding-left: 26px;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  font-weight: 300;
  font-size: 16px;
  ::placeholder {
    color: var(--color-gray2);
  }
`;
const Logo = styled.div`
  font-size: 27px;
  margin-right: 40px;
`;

const User = styled.ul`
  display: flex;
  gap: 20px;
  align-items: center;
  li {
    display: flex;
    align-items: center;
  }
`;
