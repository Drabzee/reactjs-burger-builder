import React from 'react';
import style from './Loader.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Loader = (props) => {
  return (
    <div className={style.loader}>
      {props.withBackdrop ? <Backdrop /> : null}
      <div className={style.ldsDualRing}></div>
    </div>
  )
}

export default Loader
