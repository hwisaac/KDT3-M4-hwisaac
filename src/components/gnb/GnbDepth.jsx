import React from 'react';
import { Link } from 'react-router-dom';
import style from './GnbDepth.module.css';
import { useState } from 'react';

const GnbDepth = ({targetGnb, links}) => {
  const [selected, setSelected] = useState(null);
  const handleMouseOver = (i) => {
    // if(selected === i){
    //   return setSelected(i)
    // }
    // console.log(i)
    setSelected(i)
  }
  
  return(
    <>
    {links.subLink && links.mainLink === targetGnb ? (<ul className={style.twoDep} data-main={targetGnb}>
      {
        links.mainLink === targetGnb ? 
        links.subLink && links.subLink.map((link, i)=>{
          return <li key={i} className={selected === i ? style.selectedList : style.list} onMouseOver={()=>{handleMouseOver(i);}}><Link className={style.link} to={`/category/${link}`} key={i}>{link}</Link></li>
        }) : ''
      }
    </ul>) : ''}
    </>
  )
}

export default GnbDepth;