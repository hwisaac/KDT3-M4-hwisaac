import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Arrows from './Arrows';
import Dots from './Dots';
import sliderImage from './sliderImage';
import './slider.css';
// import styles from './slider.module.css';

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex(activeIndex === 0 ? sliderImage.length - 1 : activeIndex - 1);
  };
  const nextSlide = () => {
    setDirection(1);
    setActiveIndex(activeIndex === sliderImage.length - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === sliderImage.length - 1 ? 0 : activeIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
      <Arrows prevSlide={prevSlide} nextSlide={nextSlide} />
      <Dots
        activeIndex={activeIndex}
        sliderImage={sliderImage}
        onclick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
}
