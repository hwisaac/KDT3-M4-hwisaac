import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';

const Slider = () => {
  const slideRef = useRef();

  const handleNextClick = () => {
    const slideWidth = slideRef.current.clientWidth;
    slideRef.current.scrollTo({
      left: slideRef.current.scrollLeft + slideWidth,
      behavior: 'smooth',
    });
  };

  const handlePrevClick = () => {
    const slideWidth = slideRef.current.clientWidth;
    slideRef.current.scrollTo({
      left: slideRef.current.scrollLeft - slideWidth,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper>
      <Title className="fah">
        Make the world
        <br />a better place
        <Btns>
          <BsChevronLeft onClick={handlePrevClick} />
          <BsChevronRight onClick={handleNextClick} />
        </Btns>
      </Title>
      <div></div>
      <Slides ref={slideRef}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
      </Slides>
    </Wrapper>
  );
};

export default Slider;

const Wrapper = styled.div`
  border: 1px solid black;
  background-color: var(--color-black2);
  color: var(--color-white);
  height: 500px;
  display: flex;
  padding: 150px 0;
`;

const Title = styled.h2`
  /* border: 1px solid yellow; */
  font-size: 20px;
  font-weight: 300;
  width: 30%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Slides = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 300px);
  border: 1px solid red;
  width: 100%;
  overflow: hidden;
  grid-gap: 20px;
  div {
    /* background-color: gray; */
    border: 1px solid white;
  }
  div:last-child {
    margin-right: 20px;
  }
`;

const Btns = styled.div`
  color: white;
  top: 0;
  right: 10px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.4s;
    &:hover {
      opacity: 1;
    }
  }
`;
