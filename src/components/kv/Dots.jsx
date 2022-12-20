import React from 'react';
import style from './Slider.module.css';

export default function Dots({ activeIndex, onclick, sliderImages }) {
  return (
    <div className={style.allDots}>
      {sliderImages.map((slide, index) => (
        <span
          key={`dots-${index}`}
          className={activeIndex === index ? `${style.dot} ${style.activeDot}` : `${style.dot}`}
          onClick={() => onclick(index)}
        ></span>
      ))}
    </div>
  );
}
