import React from 'react';
import { Link } from 'react-router-dom';
import style from './GnbDepth.module.css';
import { useState } from 'react';

function GnbDepth(props) {
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
    {props.links.subLink && props.links.mainLink === props.targetGnb ? (<ul className={style.twoDep} data-main={props.targetGnb}>
      {
        props.links.mainLink === props.targetGnb ? 
        props.links.subLink && props.links.subLink.map((link, i)=>{
          return <li key={i} className={selected === i ? style.selectedList : style.list} onMouseOver={()=>{handleMouseOver(i); console.log(selected)}}><Link className={style.link} to={`/category/${link}`} key={i}>{link}</Link></li>
        }) : ''
      }
    </ul>) : ''}
    </>
  )
}
export default GnbDepth;
