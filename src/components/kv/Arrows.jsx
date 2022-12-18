import React from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import style from './Slider.module.css';

export default function Arrows({ prevSlide, nextSlide }) {
  return (
    <div>
      <div className={style.prev} onClick={prevSlide}>
        <BsFillArrowLeftCircleFill />
      </div>
      <div className={style.next} onClick={nextSlide}>
        <BsFillArrowRightCircleFill />
      </div>
    </div>
  );
}
