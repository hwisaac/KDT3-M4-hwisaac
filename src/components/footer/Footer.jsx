import React from 'react';
import { useState } from 'react';
import { AiFillExclamationCircle, AiOutlineArrowRight, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';
import { SiNaver } from 'react-icons/si';
import styled from 'styled-components';
import { GrFacebookOption } from 'react-icons/gr';
import { motion } from 'framer-motion';

const placeholderVar = {
  initial: {
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#ccc',
  },
  focused: { top: '-12px', left: '0', fontSize: '14px', color: '#999' },
};
const inputVar = {
  focused: {},
};

export default function Footer() {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocus(false);
    }
  };
  return (
    <Wrapper>
      <List>
        <h3>HELP</h3>
        <ul>
          <li>support</li>
          <li>contact us</li>
          <li>shipping&returns</li>
          <li>faqs</li>
        </ul>
      </List>
      <List>
        <h3>COMPANY</h3>
        <ul>
          <li>about us</li>
          <li>blog</li>
          <li>shop</li>
        </ul>
      </List>
      <List>
        <h3>STAY IN TOUCH</h3>
        <Icons>
          <GrFacebookOption size={25} />
          <AiOutlineInstagram size={25} />
          <AiOutlineTwitter size={25} />
        </Icons>
      </List>
      <Newsletter>
        <h3>NEWSLETTER</h3>
        <p>Stay up to date our new products, promotions and helpful info on how to be eco.</p>
        <form action="">
          <EmailInput
            variants={EmailInput}
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            animate={isFocus ? 'focused' : 'initial'}
          />
          <Placeholder variants={placeholderVar} animate={isFocus ? 'focused' : 'initial'}>
            enter your e-mail
          </Placeholder>

          <div>
            <AiOutlineArrowRight size={20} />
          </div>
        </form>
      </Newsletter>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  width: 1200px;

  border-top: 1.5px solid var(--color-black2);
  padding: 50px 0 70px 0;
  margin: 0 auto;
  justify-content: space-between;
  color: var(--color-black2);
`;

const List = styled.div`
  width: 22%;

  h3 {
    font-family: 'Fahkwang';
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 30px;
  svg {
    cursor: pointer;
    &:hover {
      color: var(--color-brown);
      transition: all 0.3s;
    }
  }
`;
const Newsletter = styled.div`
  width: 40%;
  margin-left: 100px;

  display: flex;
  flex-direction: column;
  position: relative;
  h3 {
    font-family: 'Fahkwang';
    margin-bottom: 20px;
  }
  form {
    height: 40px;
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 1.5px solid var(--color-black2);
    font-size: 20px;
    input {
      background-color: var(--color-white);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      outline: none;
      width: 100%;
      position: relative;
      font-size: 16px;
      color: var(--color-black2);
    }
    div {
      background-color: var(--color-white);
      width: 10%;
      cursor: pointer;
    }
  }
`;

const Placeholder = styled(motion.label)`
  position: absolute;
  pointer-events: none;
`;

const EmailInput = styled(motion.input)``;
