import React from 'react';
import './Styles.scss';

const Card = ({children}) => {
  return (
    <div className={`${`card`}`}>{children}</div>
  )
}

export default Card;
