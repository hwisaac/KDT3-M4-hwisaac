import React from 'react';
import style from './Slider.module.css';

export default function Dots({ activeIndex, onclick, sliderImage }) {
  return (
    <div className={style.allDots}>
      {sliderImage.map((slide, index) => (
        <span
          key={index}
          className={activeIndex === index ? `${style.dot} ${style.activeDot}` : `${style.dot}`}
          onClick={() => onclick(index)}
        ></span>
      ))}
    </div>
  );
}
