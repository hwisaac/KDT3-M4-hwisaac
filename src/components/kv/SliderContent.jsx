import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import style from './Slider.module.css';

const imgVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  start: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  end: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function SliderContent({ activeIndex, sliderImages, direction }) {
  return (
    <section>
      <AnimatePresence initial={false} custom={direction}>
        {sliderImages.map((slide, slideIndex) =>
          activeIndex === slideIndex ? (
            <motion.img
              key={`slide-${slideIndex}`}
              variants={imgVariants}
              initial="initial"
              animate="start"
              exit="end"
              src={slide.url}
              className={style.slideImages}
              alt=""
            />
          ) : null,
        )}
      </AnimatePresence>
    </section>
  );
}
