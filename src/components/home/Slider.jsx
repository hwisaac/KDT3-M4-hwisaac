import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';
import slideImg0 from 'assets/image/home/home-slider0.jpg';
import slideImg1 from 'assets/image/home/home-slider1.jpg';
import slideImg2 from 'assets/image/home/home-slider2.jpg';
import slideImg3 from 'assets/image/home/home-slider3.jpg';
import slideImg4 from 'assets/image/home/home-slider4.jpg';
import slideImg5 from 'assets/image/home/home-slider5.jpg';
import slideImg6 from 'assets/image/home/home-slider6.jpg';
import slideImg7 from 'assets/image/home/home-slider7.jpg';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
};

const HomeSlider = () => {
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

      <Slides ref={slideRef}>
        <div>
          <img src="https://i.postimg.cc/KYvqp6bc/home-slider0.jpg" alt="" />
        </div>
        <div>
          <img src="https://i.postimg.cc/4x125JrF/home-slider1.jpg" alt="" />
        </div>
        <div>
          <img src="https://i.postimg.cc/htn3TJ3d/home-slider2.jpg" alt="" />
        </div>

        <div>
          <img src="https://i.postimg.cc/J4Z2s3K8/home-slider4.jpg" alt="" />
        </div>
        <div>
          <img src="https://i.postimg.cc/y6J5HCZk/home-slider5.jpg" alt="" />
        </div>
        <div>
          <img src="https://i.postimg.cc/d1hWwGDz/home-slider6.jpg" alt="" />
        </div>
        <div>
          <img src="https://i.postimg.cc/k51j0TMQ/home-slider7.jpg" alt="" />
        </div>
      </Slides>
    </Wrapper>
  );
};

export default HomeSlider;

const Wrapper = styled.div`
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

const Slides = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 300px);
  /* border: 1px solid red; */
  width: 100%;
  overflow: hidden;
  grid-gap: 20px;
  img {
    width: 100%;
    /* height: 100%; */
    /* object-fit: cover; */
    filter: grayscale(40%);
  }
  div {
    /* background-color: var(--color-black1); */
    /* border: 1px solid white; */
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
