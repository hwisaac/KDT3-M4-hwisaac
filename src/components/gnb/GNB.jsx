import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Gnb.module.css';
import GnbDepth from './GnbDepth';

const Gnb = () => {
  const LINKS = [
    { mainLink: '베스트', subLink: null},
    {
      mainLink: '농산물',
      subLink: ['과일', '채소', '곡물']
    },
    { mainLink: '수산물', subLink: ['제철', '건어물']},
    { mainLink: '축산물', subLink: null},
    {
      mainLink: '가공식품',
      subLink: ['일반', '반찬', '차류', '벌꿀', '간편간식'],
    },
    { mainLink: '전체상품', subLink: null},
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [targetGnb, setTargetGnb] = useState('');
  const [selected, setSelected] = useState(null);

  const handleMouseOver = (event) => {
    if (targetGnb) {
      setIsHovering(true);
    }
    if (!event.target.dataset.link) return;
    setTargetGnb(event.target.dataset.link);
  };

  const handleMouseOut = (event) => {
    setIsHovering(false);
  };

  const handleChange = (index) => {
    setSelected(index);
  };

  return (
    <nav className={style.nav}>
      <ul className={style.inner} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {LINKS.map((link, index) => {
          return (
            <li
              className={selected === index ? style.selectedGnbList : style.gnbList}
              key={index}
              onMouseOver={() => {
                handleChange(index);
              }}
              onMouseOut={() => {
                setSelected(null)
              }}
            >
              <Link className={style.gnbLink} to={`/category/${link.mainLink}`} data-link={link.mainLink}>
                {link.mainLink}
              </Link>
              {isHovering ? <GnbDepth targetGnb={targetGnb} links={link}/> : ''}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Gnb;
