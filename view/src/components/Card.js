/* eslint-disable react/prop-types */
import React from 'react';
import '../css/Card.css';

function Card(props) {
  const { src, title, description, price } = props;

  return (
    <div className="card d-md-flex">
      <img src={src} alt="" />
      <div className="card_text">
        <h2>{title}</h2>
        <h5>{description}</h5>
        <h3>{price}</h3>
      </div>
    </div>
  );
}

export default Card;
