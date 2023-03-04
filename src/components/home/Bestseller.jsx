import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GridLayout = ({ n }) => {
  const imageURL = (idx) => {
    let path = '';
    switch (idx) {
      case 0:
        path = 'https://i.postimg.cc/KYvqp6bc/home-slider0.jpg';
        break;
      case 1:
        path = 'https://i.postimg.cc/4x125JrF/home-slider1.jpg';
        break;
      case 2:
        path = 'https://i.postimg.cc/htn3TJ3d/home-slider2.jpg';
        break;
      case 3:
        path = 'https://i.postimg.cc/k51j0TMQ/home-slider7.jpg';
        break;
      case 4:
        path = 'https://i.postimg.cc/J4Z2s3K8/home-slider4.jpg';
        break;
      case 5:
        path = 'https://i.postimg.cc/y6J5HCZk/home-slider5.jpg';
        break;
      case 6:
        path = 'https://i.postimg.cc/d1hWwGDz/home-slider6.jpg';
        break;
      case 7:
        path = 'https://i.postimg.cc/k51j0TMQ/home-slider7.jpg';
        break;
      default:
        path = 'https://i.postimg.cc/KYvqp6bc/home-slider0.jpg';
        return;
    }

    return `url(${path})`;
  };
  console.log('n', n);
  switch (n) {
    case 1:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
              backgroundSize: 'cover',
              backgroundImage: imageURL(0),
            }}
          ></motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '2 / -1',
              gridRow: '1 / -1',
              backgroundSize: 'cover',
              backgroundImage: imageURL(1),
            }}
          ></motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
              backgroundSize: 'cover',
              backgroundImage: imageURL(2),
            }}
          ></motion.div>
        </>
      );
    case 2:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / 3',
              gridRow: '2 / 3',
              backgroundSize: 'cover',
              backgroundImage: imageURL(3),
            }}
          ></motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / 3',
              gridRow: '1 / 2',
              backgroundSize: 'cover',
              backgroundImage: imageURL(4),
            }}
          ></motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '3 / -1',
              gridRow: '1 / -1',
              backgroundSize: 'cover',
              backgroundImage: imageURL(5),
            }}
          ></motion.div>
        </>
      );
    case 3:
      return (
        <>
          <motion.div
            layoutId="firstGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / -1',
              gridRow: '2 / -1',
              backgroundSize: 'cover',
              backgroundImage: imageURL(6),
            }}
          ></motion.div>
          <motion.div
            layoutId="secondGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
              backgroundSize: 'cover',
              backgroundImage: imageURL(7),
            }}
          ></motion.div>
          <motion.div
            layoutId="thirdGrid"
            style={{
              border: '1px solid var(--color-black1)',
              gridColumn: '2 / -1',
              gridRow: '1 / 2',
              backgroundSize: 'cover',
              backgroundImage: imageURL(1),
            }}
          ></motion.div>
        </>
      );
    default:
      return (
        <>
          <motion.div className="third-1"></motion.div>
          <motion.div className="third-2"></motion.div>
          <motion.div className="third-3"></motion.div>
        </>
      );
  }
};
const Bestseller = () => {
  const [active, setActive] = useState(1);
  // 3초마다 바꾸기
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
