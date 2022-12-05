import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import style from './Slider.module.css';

export default function SliderContent({ activeIndex, sliderImage, direction }) {
  const variants = {
    initial: (direction) => {
      return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: 'ease-in',
    },
    exit: (direction) => {
      return { x: direction > 0 ? -1000 : 1000, opacity: 0, transition: 'ease-in' };
    },
  };
  return (
    <section>
      {sliderImage.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          className={slideIndex === activeIndex ? `${style.slides} ${style.active}` : `${style.inactive}`}
        >
          <img src={slide.url} className={style.slideImage} alt="" />
        </div>
        // <AnimatePresence initial={false} custom={direction}>
        //   <motion.img
        //     variants={variants}
        //     animate="animate"
        //     initial="initial"
        //     exit="exit"
        //     src={slide.url}
        //     key={slideIndex}
        //     className={slideIndex === activeIndex ? 'slides active' : 'inactive'}
        //     custom={direction}
        //   />
        // </AnimatePresence>
      ))}
    </section>
  );
}
