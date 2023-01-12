import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './GNB.module.css';
import GNBDepth from './GNBDepth';

const GNB = () => {
  const LINKS = [
    { mainLink: '베스트', subLink: null, subName: null },
    {
      mainLink: '농산물',
      subLink: ['과일', '채소', '곡물'],
      subName: ['과일', '채소', '곡물'],
    },
    { mainLink: '수산물', subLink: ['제철', '건어물'], subName: ['제철 수산물', '건어물 상품'] },
    { mainLink: '축산물', subLink: null, subName: null },
    {
      mainLink: '가공식품',
      subLink: ['일반', '반찬', '차류', '벌꿀', '간편간식'],
      subName: ['일반가공식품', '반찬, 장아찌', '차류', '벌꿀', '간편간식'],
    },
    { mainLink: '전체상품', subLink: null, subName: null },
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [targetGnb, setTargetGnb] = useState('');
  const [selected, setSelected] = useState(null);

  const handleMouseOver = (event) => {
    // if(event.target.nodeName === 'A'){
    //   setTargetGnb(event.target.dataset.link)
    // } else return
    if (targetGnb) {
      setIsHovering(true);
    }
    if (!event.target.dataset.link) return;
    setTargetGnb(event.target.dataset.link);
  };

  const handleMouseOut = (event) => {
    setIsHovering(false);
  };

  const handleChange = (i) => {
    setSelected(i);
  };

  return (
    <nav className={style.nav}>
      <ul className={style.inner} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {LINKS.map((link, i) => {
          return (
            <li
              className={selected === i ? style.selectedGnbList : style.gnbList}
              key={i}
              onMouseOver={() => {
                handleChange(i);
              }}
              onMouseOut={() => {
                setSelected(null)
              }}
            >
              <Link className={style.gnbLink} to={`/category/${link.mainLink}`} data-link={link.mainLink} key={i}>
                {link.mainLink}
              </Link>
              {isHovering ? <GNBDepth targetGnb={targetGnb} links={link} /> : ''}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default GNB;
