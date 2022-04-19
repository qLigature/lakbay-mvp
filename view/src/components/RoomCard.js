import {Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../css/RoomCard.css';

export default function RoomCard ({roomProp}) {
	const {src, title, description, price, id} = roomProp

	return (

	<Row className="my-3">	
		<Col xs={12} md={6}>
			<div className="roomCard d-flex flex-column">
				<img src={src} alt="" />
				<div className="roomCard_Text p-5" onclick={`/rooms/${id}/`}>
					<h2>{title}</h2>
					<h5>{description}</h5>
					<h3>{price}</h3>
{/*					<onclick={`/rooms/${id}/`} Button variant = "primary" as={Link} to={`/rooms/${id}`}>See Details</Button>*/}
				</div>

			</div>
		</Col>
	</Row>

	)
}