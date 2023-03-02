import React, { useState } from 'react';
import styled from 'styled-components';

const Bestseller = () => {
  const [active, setActive] = useState(0);

  return (
    <BestsellerInfo>
      <SubNav>
        <h3>Explore our bestsellers</h3>
        <ul>
          <li className={active === 0 ? 'active' : null} onClick={() => setActive(0)}>
            01
          </li>
          <li className={active === 1 ? 'active' : null} onClick={() => setActive(1)}>
            02
          </li>
          <li className={active === 2 ? 'active' : null} onClick={() => setActive(2)}>
            03
          </li>
        </ul>
      </SubNav>
      <BestsellerInfoContent>
        {[0, 1, 2].map((x) => (
          <div></div>
        ))}
      </BestsellerInfoContent>
    </BestsellerInfo>
  );
};

export default Bestseller;

const BestsellerInfo = styled.section`
  display: flex;
  width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
  justify-content: space-between;
  /* border: 1px solid black; */
`;

const SubNav = styled.div`
  font-family: 'Fahkwang';
  h3 {
    font-size: 18px;
  }
  ul {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    li {
      opacity: 0.3;
      position: relative;
      transition: all 0.3s;
      cursor: pointer;
      &.active {
        opacity: 1;
        transform: translateX(30px);
      }

      &:before {
        content: '';
        width: 0;
        transition: all 1s;
      }
      &.active:before {
        content: '';
        display: block;
        width: 15px;
        height: 1px;
        background-color: var(--color-black2);
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
    }
  }
`;
const BestsellerInfoContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 220px);
  grid-template-rows: repeat(2, 300px);
  grid-gap: 10px;
  div {
    background-color: gray;
    border: 1px solid black;
  }
  div:nth-child(2) {
    grid-column: 2/-1;
    grid-row: 1/-1;
  }
`;
