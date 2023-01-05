import React from 'react';
import { BsArrowDownShort, BsArrowUpShort, BsList } from 'react-icons/bs';
import style from './OverviewCard.module.css';

const OverviewCard = ({ title, content }) => {
  return (
    <div className={style.card}>
      <div className={style.row}>
        <div className={style.title}>{title}</div>
        <BsList className={style.icon} />
      </div>
      <div className={style.row}>
        <div className={style.content}>{content.toLocaleString()}</div>
        <div className={style.badge}>
          <BsArrowUpShort className={style.icon} />
          <span>20%</span>
          {/* <BsArrowDownShort /> */}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
