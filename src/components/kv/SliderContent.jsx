import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Slider.module.css';

export default function SliderContent({ activeIndex, sliderImage }) {
  const navigate = useNavigate();
  return (
    <section>
      {sliderImage.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={slideIndex === activeIndex ? `${style.slides} ${style.active}` : `${style.inactive}`}
          onClick={() => navigate(`/products/${slide.id}`)}
        >
          {console.log('slide:', slide.id)}
          <img src={slide.url} className={style.slideImage} alt={slide.title} />
        </div>
      ))}
    </section>
  );
}
