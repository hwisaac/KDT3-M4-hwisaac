import React from 'react';
import styled, { css } from 'styled-components';

export default function Button({ text, onClick, heart }) {
  return (
    <Btn text={text === '구매하기' ? 'buy' : null} onClick={onClick}>
      {text}
      {/* {text === '찜하기' && <span className={heart ? style.heartIcon_red : style.heartIcon}>찜</span>} */}
    </Btn>
  );
}

const Btn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background-color: transparent;
  color: var(--color-black1);
  font-weight: 500;
  border: 1px solid var(--color-black2);
  background-color: transparent;
  color: var(--color-black2);
  width: 100%;
  &:hover {
    background-color: var(--color-black2);
    color: var(--color-white);
    transition: all 0.3s ease-in-out;
  }
  ${(props) =>
    props.text === 'buy' &&
    css`
      background-color: var(--color-black2);
      color: var(--color-white);
      width: 80%;
      &:hover {
        background-color: transparent;
        color: var(--color-black2);
        transition: all 0.3s ease-in-out;
      }
    `}
`;
