import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer className={style.footer}>
      <div className={style.inner}></div>
      <h2 className={style.title}>Footer</h2>
    </footer>
  );
};

export default Footer;
