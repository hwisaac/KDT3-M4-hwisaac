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
        <Link>btn1</Link>
        <Link>btn2</Link>
        <Link>btn3</Link>
        <Link>btn4</Link>
        <Link>btn5</Link>
      </div>
    </nav>
  );
};

export default GNB;
