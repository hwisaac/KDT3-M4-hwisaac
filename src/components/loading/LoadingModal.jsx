import React from 'react';
import { motion, useSpring } from 'framer-motion';
import style from './LoadingModal.module.css';

const wrapperVars = {
  initial: {},
  animate: {},
};
const modalVars = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 3,
      staggerChildren: 0.2,
    },
  },
};
const itemVars = {
  animate: {
    height: [40, 15, 30],
    y: [-50, 0, 50],
    opacity: [0, 1, 0],

    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const LoadingModal = () => {
  return (
    <motion.div className={style.wrapper} variants={wrapperVars} initial="initial" animate="animate">
      <motion.div className={style.modal} variants={modalVars} initial="initial" animate="animate">
        <motion.div className={style.item} variants={itemVars}></motion.div>
        <motion.div className={style.item} variants={itemVars}></motion.div>
        <motion.div className={style.item} variants={itemVars}></motion.div>
        <motion.div className={style.item} variants={itemVars}></motion.div>
        <motion.div className={style.item} variants={itemVars}></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingModal;
