import React from 'react';

import '../css/Card.css'

function Card({ src, title, description, price}) {
	return (
		<div className="card">
			<img src={src} alt=""/>
			<div className="card_text">
				<h2>{title}</h2>
				<h5>{description}</h5>
				<h3>{price}</h3>
			</div>
			
		</div>
	)
}

export default Card