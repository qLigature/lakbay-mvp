import React from 'react';
import '../css/Home.css';
import Banner from '../components/Banner';
import Card from '../components/Card';


function Home() {
	return (

		<div className="home">
			<Banner />

			<h1 className="text-center pt-5 mt-5">Featured Rooms</h1>

			<div className="home_Cards d-flex">
				<Card
					src="https://images.pexels.com/photos/7601377/pexels-photo-7601377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
					title="Three-Bedroom Flat in Batangas"
					description="Enjoy this amazing home with your friends and loved ones."
					price="PHP 1500 / night"
				/>
				<Card
					src="https://images.pexels.com/photos/7027788/pexels-photo-7027788.jpeg?cs=srgb&dl=pexels-curtis-adams-7027788.jpg&fm=jpg"
					title="Two-Bedroom Condominium"
					description="Relax and enjoy your day in our two-bedroom condominium, with pool, gym, and Wifi."
					price="PHP 1000 / night"
				/>
				<Card
					src="https://images.pexels.com/photos/11723568/pexels-photo-11723568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					title="Penthouse in Tagaytay"
					description="Enjoy the relaxing view of Taal Volcano."
					price="PHP 4000"
				/>
			</div>

			<div className="home_Cards d-flex col-12">
				<Card
					src="http://luxesocietyasia.com/wp-content/uploads/2017/02/Solaire-View.jpg"
					title="Solaire Resort & Casino Manila Skytower"
					description="Relax and enjoy the high life."
					price="PHP 10,500/night"
				/>
				<Card
					src="https://media.istockphoto.com/photos/luxury-loft-living-room-interior-picture-id1278121500?b=1&k=20&m=1278121500&s=612x612&w=0&h=V4jRZL368Yix2uxlSUdDy1sxYeggCuVWxQR9NNST0RE="
					title="Penthouse in BGC"
					description="Enjoy the amazing view with someone you love."
					price="PHP 12,000"
				/>
				<Card
					src="https://i.pinimg.com/originals/7a/6c/b3/7a6cb35ef57c0072d02ac6ee30519c62.jpg"
					title="Penthouse in Pasay"
					description="Relax with exquisite amenities in this 3 bedroom penthouse."
					price="PHP 6000/night"
				/>
			</div>

		</div>

	);
}

export default Home;
