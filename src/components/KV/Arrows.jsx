import React from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows">
      <div className="prev" onClick={prevSlide}>
        <BsFillArrowLeftCircleFill />
      </div>
      <div className="next" onClick={nextSlide}>
        <BsFillArrowRightCircleFill />
      </div>
    </div>
  );
}
