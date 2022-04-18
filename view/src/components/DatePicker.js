import React, { useState} from 'react';
import {Button} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import HeadCountIcon from '@mui/icons-material/People';
	
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../css/DatePicker.css';

function DatePicker() {

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const selectionRange = { 
		startDate: startDate,
		endDate: endDate,
		key: "selection"

	};

	function handleSelect(ranges) {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	}

	return (
		<div className="datePicker">
			<DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
		</div>
	)
}

export default DatePicker