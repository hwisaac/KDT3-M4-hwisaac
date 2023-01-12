import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import style from './Slider.module.css';

export default function SliderContent({ activeIndex, sliderImages, direction }) {
  const navigate = useNavigate();
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
        duration: 1,
      },
    },
    end: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
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
              className={style.slideImage}
              alt={slide.title}
              onClick={() => navigate(`/products/${slide.id}`)}
            />
          ) : null,
        )}
      </AnimatePresence>
    </section>
  );
}
