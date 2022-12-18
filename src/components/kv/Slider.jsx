import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Arrows from './Arrows';
import Dots from './Dots';
import sliderImage from './sliderImage';
import style from './Slider.module.css';

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? sliderImage.length - 1 : activeIndex - 1);
  };

  const nextSlide = () => {
    setActiveIndex(activeIndex === sliderImage.length - 1 ? 0 : activeIndex + 1);
    console.log('slide:', sliderImage);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === sliderImage.length - 1 ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={style.sliderContainer}>
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
