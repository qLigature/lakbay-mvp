import React from 'react';
import roomsData from'../data/roomsData';
import RoomCard from '../components/RoomCard';



export default function Rooms() {


	const rooms = roomsData.map(room => {
		console.log(room)
		return (
			<RoomCard key={room.id} roomProp={room}/>
		);
	});


	return (

		<>
			<h1>Available Rooms</h1>
			{rooms}
		</>
	)
}




