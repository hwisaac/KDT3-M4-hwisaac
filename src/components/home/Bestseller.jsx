import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BestsellerCard from './BestsellerCard';
import prods from './_prod.json';
// const prods = [
//   {
//     id: 'PJ0aRY2h5WIAZRySh2cc',
//     title: 'ORGANIC ROSE CHARCOAL FACIAL BAR',
//     price: 1000,
//     photo: 'https://storage.googleapis.com/heropy-api/vHhIVjJEJ2v081228.webp',
//   },
//   {
//     id: 'gAn5renmhTVg5ypqBF7j',
//     title: 'FACIAL ROUNDS',
//     price: 1800,
//     photo: 'https://storage.googleapis.com/heropy-api/vX7RWkuFsrv081912.webp',
//   },
//   {
//     id: 'lLiCQWxj8XcC8pHNm5I4',
//     title: 'STAINLESS STEEL STRAWS',
//     price: 300,
//     photo: 'https://storage.googleapis.com/heropy-api/vqzf2gBCGxv082045.webp',
//   },
//   {
//     id: 'QprtQhuW6AOxPYaBbaex',
//     title: 'THE UNWASTE SHOP TOTE BAG',
//     price: 1399,
//     photo: 'https://storage.googleapis.com/heropy-api/vhbYqPphyIDv082303.webp',
//   },
//   {
//     id: 'kd2zQlyo1AuHaQfjhgdf',
//     title: 'SALT SCRUB',
//     price: 1899,
//     photo: 'https://storage.googleapis.com/heropy-api/vOE455GMq6v081958.webp',
//   },
//   {
//     id: 'bJpVEAJ1WaFPRlBudXry',
//     title: 'BODY SOAP BAR',
//     price: 799,
//     photo: 'https://storage.googleapis.com/heropy-api/v7jTN-ig4Av081635.webp',
//   },
//   {
//     id: 'yrR2QeoZy2kD4gN4wOcG',
//     title: 'BATH BOMBS',
//     price: 900,
//     photo: 'https://storage.googleapis.com/heropy-api/vIgEyk7gAB2v081542.webp',
//   },
//   {
//     id: 'KF8Gj2WX9i4KHbWNxFp7',
//     title: 'WOOL DRYER BALLS',
//     price: 2000,
//     photo: 'https://storage.googleapis.com/heropy-api/vABkoSXZaLHv081404.webp',
//   },
//   {
//     id: 'GNrSJPxPuBGcCoqbauPE',
//     title: 'BEESWAX WRAPS',
//     price: 1900,
//     photo: 'https://storage.googleapis.com/heropy-api/vIflFj5spmFv081010.webp',
//   },
// ];

const GridLayout = ({ n }) => {
  switch (n) {
    case 1:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
            }}
          >
            <BestsellerCard product={prods[0]} />
          </motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              gridColumn: '2 / -1',
              gridRow: '1 / -1',
            }}
          >
            <BestsellerCard product={prods[1]} />
          </motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
            }}
          >
            <BestsellerCard product={prods[2]} />
          </motion.div>
        </>
      );
    case 2:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              gridColumn: '1 / 3',
              gridRow: '2 / 3',
            }}
          >
            <BestsellerCard product={prods[3]} />
          </motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              gridColumn: '1 / 3',
              gridRow: '1 / 2',
            }}
          >
            <BestsellerCard product={prods[4]} />
          </motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              gridColumn: '3 / -1',
              gridRow: '1 / -1',
            }}
          >
            <BestsellerCard product={prods[5]} />
          </motion.div>
        </>
      );
    case 3:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              gridColumn: '1 / -1',
              gridRow: '2 / -1',
            }}
          >
            <BestsellerCard product={prods[6]} />
          </motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
            }}
          >
            <BestsellerCard product={prods[7]} />
          </motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              gridColumn: '2 / -1',
              gridRow: '1 / 2',
            }}
          >
            <BestsellerCard product={prods[8]} />
          </motion.div>
        </>
      );
    default:
      return (
        <>
          <motion.div className="third-1">
            <BestsellerCard product={prods[6]} />
          </motion.div>
          <motion.div className="third-2">
            <BestsellerCard product={prods[7]} />
          </motion.div>
          <motion.div className="third-3">
            <BestsellerCard product={prods[8]} />
          </motion.div>
        </>
      );
  }
};
const Bestseller = () => {
  const [active, setActive] = useState(1);
  // 5초마다 바꾸기
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((prev) => {
        if (prev < 3) return prev + 1;
        return 1;
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <>
      <BestsellerInfo>
        <SubNav>
          <h3>Explore our bestsellers</h3>
          <ul>
            <li className={active === 1 ? 'active' : null} onClick={() => setActive(1)}>
              01
            </li>
            <li className={active === 2 ? 'active' : null} onClick={() => setActive(2)}>
              02
            </li>
            <li className={active === 3 ? 'active' : null} onClick={() => setActive(3)}>
              03
            </li>
          </ul>
        </SubNav>
        <BestsellerInfoContent>
          <GridLayout n={active} />
        </BestsellerInfoContent>
      </BestsellerInfo>
      {/* <div onClick={toggleClicked}>
        <Box>{!clicked ? <Circle layoutId="circle" style={{ borderRadius: 50 }} /> : null}</Box>
        <Box>{clicked ? <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} /> : null}</Box>
      </div> */}
    </>
  );
};
const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

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
const BestsellerInfoContent = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 220px);
  grid-template-rows: repeat(2, 300px);
  grid-gap: 10px;
  /* div {
    background-color: gray;
    border: 1px solid black;
  } */
  /* div.first-2 {
    grid-column: 2/-1;
    grid-row: 1/-1;
  }

  div.second-1 {
    grid-column: 1/2;
    grid-row: 1/-1;
  }
  div.second-3 {
    grid-column: 2/-1;
    grid-row: 2/-1;
  }
  div.third-1 {
    grid-column: 1/-1;
    grid-row: 1/2;
  }
  div.third-3 {
    grid-column: 2/-1;
    grid-row: 2/-1;
  } */
`;
