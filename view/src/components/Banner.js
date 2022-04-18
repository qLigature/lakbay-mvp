import React, { useState} from 'react';

import { Button } from 'react-bootstrap';
import DatePicker from './DatePicker';
import '../pages/Home';
import '../css/Banner.css';

function Banner() {

	const [showCalendar, setShowCalendar] = useState(false);

	return (
		<div className="banner">
			<div className="banner_calendar d-flex flex-column">
			

				<Button onClick={() => setShowCalendar(!showCalendar)} className="banner_calendarButton" variant="outlined">
				    {showCalendar ? "Hide" : "Search Dates"}
				</Button>
				{showCalendar && <DatePicker />}

			</div>
			<div className="banner_text">
			<h2>Dare to live the life you've always dreamed of</h2>
			<h6>Plan your next getaway and discover the adventure that awaits.</h6>
			<Button variant="outlined">Explore Now</Button>
			</div>
			
		</div>
	)
}

export default Banner