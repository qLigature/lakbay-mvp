import React from 'react';
import '../css/Home.css';
import Banner from '../components/Banner';
import Card from '../components/Card';


function Home() {
	return (

		<div className="home">
			<Banner />

				<div className="home_Cards d-flex">
					<Card
					    src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
					    title="lorem ipsum"
					    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					/>
					<Card
					    src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
					    title="lorem ipsum"
					    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					/>
					<Card
					    src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
					    title="lorem ipsum"
					    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					/>
				</div>

				<div className="home_Cards">
					<Card
	                src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
	                title="lorem ipsum"
	                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	                price="₱ 8500/night"
		            />
		            <Card
		                src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
		                title="lorem ipsum"
		                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		                price="₱ 22,000/night"
		            />
		            <Card
		                src="https://images.pexels.com/photos/22254/pexels-photo.jpg?cs=srgb&dl=pexels-alex-l%C3%A1zaro-22254.jpg&fm=jpg"
		                title="lorem ipsum"
		                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		                price="₱ 3000/night"
		            />
		        </div>

				<div className="home_Cards">
					<Card
		            />
		            <Card
		            />
		            <Card
		            />
				</div>

		</div>
		
	)
}

export default Home