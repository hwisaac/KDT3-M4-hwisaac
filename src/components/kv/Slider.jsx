import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Arrows from './Arrows';
import Dots from './Dots';
import sliderImages from './sliderImages';
import style from './Slider.module.css';

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(1);
  // const [direction, setDirection] = useState(0);

  const prevSlide = () => {
    // setDirection(-1);
    if (activeIndex === 0) {
      setActiveIndex(sliderImages.length - 1); // 0이면 이미지[4]가 active
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const nextSlide = () => {
    // setDirection(1);
    if (activeIndex === sliderImages.length - 1) {
      setActiveIndex(0); // 마지막 이미지인 경우 이미지[0]을 active
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };
  /**
   * activeIndex 가 변한지 3초지나면 activeIndex 를 변경함
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === sliderImages.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={style.sliderContainer}>
      <SliderContent activeIndex={activeIndex} sliderImages={sliderImages} />
      <Arrows prevSlide={prevSlide} nextSlide={nextSlide} />
      <Dots
        activeIndex={activeIndex}
        sliderImages={sliderImages}
        onclick={(clickedIndex) => setActiveIndex(clickedIndex)}
      />
    </div>
  );
}
