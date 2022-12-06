import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './GNB.module.css';

const GNB = (props) => {
  return (
    <nav className={style.nav}>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row">
        <Link to={`/category/채소`}>채소</Link>
        <Link to={`/category/수산물`}>btn2</Link>
        <Link to={`/category/축산물`}>btn3</Link>
        <Link to={`/category/일반`}>btn4</Link>
        <Link to={`/category/5`}>btn5</Link>
      </div>
    </nav>
  );
};

export default GNB;
