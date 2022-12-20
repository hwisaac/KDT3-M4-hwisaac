import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Slider.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function SliderContent({ activeIndex, sliderImage }) {
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
  // return (
  //   <section>
  //     <AnimatePresence initial={false} custom={direction}>
  //       {sliderImages.map((slide, slideIndex) =>
  //         activeIndex === slideIndex ? (
  //           <motion.img
  //             key={`slide-${slideIndex}`}
  //             variants={imgVariants}
  //             initial="initial"
  //             animate="start"
  //             exit="end"
  //             src={slide.url}
  //             className={style.slideImages}
  //             alt=""
  //           />
  //         ) : null,
  //       )}
  //     </AnimatePresence>
  //   </section>
  // );
  return (
    <section>
      {sliderImage.map((slide, slideIndex) =>
        activeIndex === slideIndex ? (
          <div
            key={slide.id}
            className={slideIndex === activeIndex ? `${style.slides} ${style.active}` : `${style.inactive}`}
            onClick={() => navigate(`/products/${slide.id}`)}
          >
            {console.log('slide:', slide.id)}
            <img src={slide.url} className={style.slideImage} alt={slide.title} />
          </div>
        ) : null,
      )}
    </section>
  );
}
